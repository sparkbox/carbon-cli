/**
 * spawn shell commands
 */

import { exec } from 'shelljs';

interface ShellOpts {
  silent?: boolean;
}

function run(command: string, opts: ShellOpts = {}): Promise<string> {
  return new Promise((resolve, reject): void => {
    exec(command, { silent: true, ...opts }, (exitCode, stdout, stderr) => {
      if (exitCode > 0) reject(new ShellError(stderr));
      resolve(stdout);
    });
  });
}

class ShellError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShellError';
  }
}

export { run };
