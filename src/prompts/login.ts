/**
 * collect project options
 */

import chalk from 'chalk';
import { prompt, Answers } from 'inquirer';
import { password } from '../util';

const gh = chalk.gray.bold('GitHub');

async function login(): Promise<Answers> {
  return await prompt([
    {
      type: 'input',
      name: 'username',
      message: `${gh} username or email`,
    },
    {
      type: 'input',
      name: 'password',
      message: `${gh} password`,
      transformer: password,
    },
  ]);
}

async function oneTimePassword(): Promise<string> {
  const { otp } = await prompt([
    {
      type: 'input',
      name: 'otp',
      message: `${gh} 2FA passcode`,
    },
  ]);

  return otp;
}

export { login, oneTimePassword };
