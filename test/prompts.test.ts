import test from 'ava';
import { match } from 'sinon';
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
  const answers = await buildOptions([{ name: 'test-autocomplete' }]);
  t.deepEqual(answers, {
    sourceRepo: { name: 'test-autocomplete' },
    branch: 'test-branch',
    projectName: 'test-projectName',
    projectNameHuman: 'test-projectNameHuman',
    projectDir: `${process.cwd()}/test-projectName`,
    shouldCreateRemote: false,
  });
});

test('confirmOptions prompt', async t => {
  const { confirmOptions } = await rewiremock.module(() => import('../src/prompts/project-options'), {
    inquirer: mockInquirer,
    'inquirer-autocomplete-prompt': () => {},
  });
  const proceed = await confirmOptions();
  t.false(proceed);
});
