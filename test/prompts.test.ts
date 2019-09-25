import test from 'ava';
import rewiremock from 'rewiremock';
import mockInquirer from './mocks/mock-inquirer';

test('login prompt', async t => {
  const { login } = await rewiremock.module(() => import('../src/prompts/login'), {
    inquirer: mockInquirer,
  });
  const answers = await login();
  t.deepEqual(answers, {
    username: 'test-username',
    password: 'test-password',
  });
});

test('oneTimePassword prompt', async t => {
  const { oneTimePassword } = await rewiremock.module(() => import('../src/prompts/login'), {
    inquirer: mockInquirer,
  });
  const answer = await oneTimePassword();
  t.is(answer, 'test-otp');
});

test('buildOptions prompt', async t => {
  const { buildOptions } = await rewiremock.module(() => import('../src/prompts/project-options'), {
    inquirer: mockInquirer,
    'inquirer-autocomplete-prompt': () => {},
  });
  const answers = await buildOptions(['repo1', 'repo2']);
  t.deepEqual(answers, {
    sourceRepo: 'test-sourceRepo',
    branch: 'test-branch',
    projectName: 'test-projectName',
    projectNameHuman: 'test-projectNameHuman',
    projectDir: `${process.cwd()}/test-projectName`,
    shouldCreateRemote: false,
  });
});
