/**
 * github client
 */

import Octokit from '@octokit/rest';
import { login, oneTimePassword } from './prompts';

const debug = process.env.DEBUG === 'octokit' ? console.log : (): void => {};

interface GHClient {
  owner: string;
  repos: Repo[];
  getDownload: (repo: string, branch: string) => Promise<string>;
  createRepo: (name: string) => Promise<NewRepo>;
}

async function GHClient({ authToken, org }: { authToken?: string; org?: string }): Promise<GHClient> {
  const gh = await github(authToken);
  const user = await getUser(gh);
  const owner = org || user.login;
  const repos = org ? await getOrgRepos(gh, org) : await getUserRepos(gh, user.login);
  const getDownload = (repo: string, branch: string): Promise<string> => getDownloadUrl(gh, repo, owner, branch);
  const createRepo = org
    ? (name: string): Promise<NewRepo> => createOrgRepo(gh, name, org)
    : (name: string): Promise<NewRepo> => createUserRepo(gh, name);

  return { owner, repos, getDownload, createRepo };
}

async function github(authToken?: string): Promise<Octokit> {
  if (authToken) {
    return new Octokit({
      userAgent: '@sparkbox/carbon-cli',
      auth: authToken,
      log: { debug },
    });
  }

  const { username, password } = await login();

  return new Octokit({
    userAgent: '@sparkbox/carbon-cli',
    auth: {
      username,
      password,
      on2fa: oneTimePassword,
    },
    log: { debug },
  });
}

async function getUser(gh: Octokit): Promise<User> {
  const { data: user } = await gh.users.getAuthenticated();
  return user;
}

async function getUserRepos(gh: Octokit, username?: string): Promise<Repo[]> {
  const { data: repos } = await gh.repos.listForUser({
    username,
    type: 'all',
    sort: 'updated',
    per_page: 100,
  });

  return repos;
}

async function getOrgRepos(gh: Octokit, org: string): Promise<Repo[]> {
  const { data: repos } = await gh.repos.listForOrg({
    org,
    type: 'all',
    sort: 'updated',
    per_page: 100,
  });

  return repos;
}

async function createUserRepo(gh: Octokit, name: string): Promise<NewRepo> {
  const { data: newRepo } = await gh.repos.createForAuthenticatedUser({
    name,
    private: true,
    allow_merge_commit: false,
  });

  return newRepo;
}

async function createOrgRepo(gh: Octokit, name: string, org: string): Promise<NewRepo> {
  const { data: teams } = await gh.teams.list({ org });
  const { id: teamId } = teams.find(t => t.slug === org) || {};

  const { data: newRepo } = await gh.repos.createInOrg({
    name,
    org,
    private: true,
    team_id: teamId,
    allow_merge_commit: false,
  });

  return newRepo;
}

async function getDownloadUrl(gh: Octokit, repo: string, owner: string, branch = 'master'): Promise<string> {
  // https://github.com/sparkbox/${repoName}/archive/${branch}.zip
  let res;
  try {
    res = ((await gh.repos.getArchiveLink({
      owner,
      repo,
      archive_format: 'tarball',
      ref: branch || 'master',
    })) as unknown) as { url: string };

    return res.url;
  } catch (e) {
    return `https://github.com/sparkbox/${repo}/archive/${branch}.zip`;
  }
}

export { GHClient, github, getUser, getOrgRepos, getUserRepos, createUserRepo, createOrgRepo };
