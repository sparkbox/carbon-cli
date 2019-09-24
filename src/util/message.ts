/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Send messages to the console
 */

import chalk from 'chalk';
import boxen from 'boxen';
import { Repo, ProjectOptions } from '../types';

const { red, gray, magenta } = chalk;

function message(...args: any[]): void {
  console.log(...args);
}

message.error = function(...args: any[]): void {
  console.error(red(...args));
};

function overview(projectOptions: ProjectOptions, repo: Repo): void {
  const summary = `success!

❯ ${magenta.bold(projectOptions.projectDir)}

${gray('---')}

${gray.bold('url')}   ${repo.url}
${gray.bold('ssh')}   ${repo.ssh_url}
${gray.bold('https')} ${repo.clone_url}`;

  console.log(
    boxen(summary, {
      padding: 1,
      borderColor: 'gray',
      borderStyle: boxen.BorderStyle.Round,
    }),
  );
}

export { message, overview };
