/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Send messages to the console
 */

import boxen from 'boxen';
import chalk from 'chalk';
import { NewRepo, ProjectOptions } from '../types';

const { red, gray, magenta, cyan, yellow } = chalk;

function message(...args: any[]): void {
  console.log(...args);
}

message.error = function(...args: any[]): void {
  console.error(red(...args));
};

function reviewOptions(projectOptions: ProjectOptions): void {
  const summary = `Please Review

${gray.bold('from:')} ${magenta(projectOptions.sourceRepo)}:${magenta(projectOptions.branch)}
${gray.bold('to:')} ${cyan(projectOptions.projectDir)}

${
  projectOptions.shouldCreateRemote
    ? `This will create a new ${yellow(projectOptions.owner)} repo on GitHub`
    : 'This will not create a new repo on GitHub'
}`;

  console.log(
    boxen(summary, {
      padding: 1,
      borderColor: 'gray',
      borderStyle: boxen.BorderStyle.Round,
    }),
  );
}

function overview(projectOptions: ProjectOptions, newRemote?: NewRepo): void {
  let summary = `success!

❯ ${magenta.bold(projectOptions.projectDir)}`;

  if (newRemote) {
    summary += `

${gray('---')}

${gray.bold('url')}   ${newRemote.html_url}
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

export { message, reviewOptions, overview };
