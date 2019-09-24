/**
 * github client
 */

import Octokit from '@octokit/rest';
import { login, oneTimePassword } from './prompts';
import { Repo, NewRepo } from './types';

async function github(authToken?: string): Promise<Octokit> {
  if (authToken) {
    return new Octokit({ userAgent: '@sparkbox/carbon-cli', auth: authToken });
  }

  const { username, password } = await login();

  return new Octokit({
    userAgent: '@sparkbox/carbon-cli',
    auth: {
      username,
      password,
      on2fa: oneTimePassword,
    },
  });
}

async function getRepos(gh: Octokit): Promise<Repo[]> {
  const { data: repos } = await gh.repos.listForOrg({
    org: 'sparkbox',
    type: 'all',
    sort: 'updated',
    per_page: 100,
  });

  return repos;
}

// temporarily will create a "user" repo as oposed to "org"
async function createRepo(gh: Octokit, name: string): Promise<NewRepo> {
  // const { data: teams } = await gh.teams.list({ org: 'sparkbox' });
  // const { id: sbTeamId } = teams.find(t => t.slug === 'sparkbox') || {};

  // const { data: newRepo } = await gh.repos.createInOrg({
  //   name,
  //   org: 'sparkbox',
  //   private: true,
  //   team_id: sbTeamId,
  //   allow_merge_commit: false,
  //   auto delete head branches?
  // });

  const { data: newRepo } = await gh.repos.createForAuthenticatedUser({
    name,
    private: true,
    allow_merge_commit: false,
  });

  return newRepo;
}

export { github, getRepos, createRepo };

// TODO:
// repos.updateBranchProtection to protect master
