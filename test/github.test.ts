import test from 'ava';
import rewiremock from 'rewiremock';
import { spy, stub, match } from 'sinon';
import Octokit from '@octokit/rest';
import mockPrompts from './mocks/mock-prompts';

const octokitSpy = spy();

test('instantiates octokit with correct args', async t => {
  const { github } = await rewiremock.module(() => import('../src/github'), {
    '@octokit/rest': octokitSpy,
    './prompts': mockPrompts,
  });

  await github();

  t.assert(
    octokitSpy.calledWith({
      userAgent: '@sparkbox/carbon-cli',
      auth: {
        on2fa: match.func,
        password: 'test-password',
        username: 'test-user',
      },
    }),
  );
});

test('getRepos', async t => {
  const { getRepos } = await rewiremock.module(() => import('../src/github'), {
    '@octokit/rest': octokitSpy,
    './prompts': mockPrompts,
  });
  const gh = {
    repos: {
      listForOrg: stub().returns(Promise.resolve({ data: {} })),
    },
  };

  await getRepos((gh as unknown) as Octokit);

  t.assert(
    gh.repos.listForOrg.calledWith({
      org: 'sparkbox',
      type: 'all',
      sort: 'updated',
      per_page: 100,
    }),
  );
});

test('createRepo', async t => {
  const { createRepo } = await rewiremock.module(() => import('../src/github'), {
    '@octokit/rest': octokitSpy,
    './prompts': mockPrompts,
  });
  const gh = {
    repos: {
      createForAuthenticatedUser: stub().returns(Promise.resolve({ data: {} })),
    },
  };

  await createRepo((gh as unknown) as Octokit, 'test-repo-name');

  t.assert(
    gh.repos.createForAuthenticatedUser.calledWith({
      name: 'test-repo-name',
      private: true,
      allow_merge_commit: false,
    }),
  );
});
