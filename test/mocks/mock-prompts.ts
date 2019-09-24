import { Answers } from 'inquirer';

async function mockLogin(): Promise<Answers> {
  return {
    username: 'test-user',
    password: 'test-password',
  };
}

async function mockOneTimePassword(): Promise<string> {
  return 'test-otp';
}

export default { login: mockLogin, oneTimePassword: mockOneTimePassword };
