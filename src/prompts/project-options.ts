/**
 * collect project options
 */

import { join } from 'path';
import { prompt, registerPrompt, Answers } from 'inquirer';
import autocomplete from 'inquirer-autocomplete-prompt';
import chalk from 'chalk';
import fuzzy from 'fuzzy';
import { kebabCase, startCase } from '../util';
import { ProjectOptions } from '../types';

registerPrompt('autocomplete', autocomplete);

const displayAsPath = (newProjectDir: string): string => {
  return `${chalk.gray(process.cwd() + '/')}${chalk.cyan(kebabCase(newProjectDir))}`;
};

async function buildOptions(repoNames: string[]): Promise<ProjectOptions> {
  const opts = await prompt([
    {
      type: 'autocomplete',
      name: 'sourceRepo',
      message: 'search for a repo to replicate',
      async source(answers: Answers[], input: string): Promise<string[]> {
        input = input || '';
        const fuzzyResult = fuzzy.filter(input, repoNames);
        return fuzzyResult.map(el => el.original);
      },
    },
    {
      type: 'input',
      name: 'branch',
      message: 'which branch',
      default: 'template',
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'new project name',
      filter: kebabCase,
      transformer: displayAsPath,
    },
    {
      type: 'input',
      name: 'projectNameHuman',
      message: 'human readable project name',
      default({ projectName }: ProjectOptions): string {
        return startCase(projectName);
      },
    },
    {
      type: 'confirm',
      name: 'shouldCreateRemote',
      message: 'create a new repo on GitHub',
      default: false,
    },
  ]);

  return { ...opts, projectDir: join(process.cwd(), opts.projectName) };
}

async function confirmOptions(): Promise<boolean> {
  const { confirmation } = await prompt([
    {
      type: 'confirm',
      name: 'confirmation',
      message: 'proceed 👍',
      default: false,
    },
  ]);

  return confirmation;
}

export { buildOptions, confirmOptions };
