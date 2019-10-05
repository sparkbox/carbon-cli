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
      log: { debug: match.func },
    }),
  );
});

test('getRepos', async t => {
  const { getUserRepos } = await rewiremock.module(() => import('../src/github'), {
    '@octokit/rest': octokitSpy,
    './prompts': mockPrompts,
  });
  const gh = {
    repos: {
      listForUser: stub().returns(Promise.resolve({ data: {} })),
    },
  };

  await getUserRepos((gh as unknown) as Octokit, 'test-user');

  t.assert(
    gh.repos.listForUser.calledWith({
      username: 'test-user',
      type: 'all',
      sort: 'updated',
      per_page: 100,
    }),
  );
});

test('createRepo', async t => {
  const { createUserRepo } = await rewiremock.module(() => import('../src/github'), {
    '@octokit/rest': octokitSpy,
    './prompts': mockPrompts,
  });
  const gh = {
    repos: {
      createForAuthenticatedUser: stub().returns(Promise.resolve({ data: {} })),
    },
  };

  await createUserRepo((gh as unknown) as Octokit, 'test-repo-name');

  t.assert(
    gh.repos.createForAuthenticatedUser.calledWith({
      name: 'test-repo-name',
      private: true,
      allow_merge_commit: false,
    }),
  );
});
