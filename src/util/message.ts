/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Send messages to the console
 */

import chalk from 'chalk';
import boxen from 'boxen';
import { NewRepo, ProjectOptions } from '../types';

const { red, gray, magenta } = chalk;

function message(...args: any[]): void {
  console.log(...args);
}

message.error = function(...args: any[]): void {
  console.error(red(...args));
};

function overview(projectOptions: ProjectOptions, newRemote?: NewRepo): void {
  let summary = `success!

❯ ${magenta.bold(projectOptions.projectDir)}`;

  if (newRemote) {
    summary += `

${gray('---')}

${gray.bold('url')}   ${newRemote.url}
${gray.bold('ssh')}   ${newRemote.ssh_url}
${gray.bold('https')} ${newRemote.clone_url}`;
  }

  console.log(
    boxen(summary, {
      padding: 1,
      borderColor: 'gray',
      borderStyle: boxen.BorderStyle.Round,
    }),
  );
}

export { message, overview };
