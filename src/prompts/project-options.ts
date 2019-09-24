/**
 * collect project options
 */

import { join } from 'path';
import { prompt, registerPrompt, Answers } from 'inquirer';
import autocomplete from 'inquirer-autocomplete-prompt';
import chalk from 'chalk';
import fuzzy from 'fuzzy';
import { kebabCase } from '../util';
import { ProjectOptions } from '../types';

registerPrompt('autocomplete', autocomplete);

const path = (newProjectDir: string): string => {
  return `${chalk.gray(process.cwd() + '/')}${chalk.cyan(kebabCase(newProjectDir))}`;
};

async function buildOptions(repos: string[]): Promise<ProjectOptions> {
  const opts = await prompt([
    {
      type: 'autocomplete',
      name: 'projectType',
      message: 'search repos',
      async source(answers: Answers[], input: string): Promise<string[]> {
        input = input || '';
        const fuzzyResult = fuzzy.filter(input, repos);
        return fuzzyResult.map(el => el.original);
      },
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'project name',
      filter: kebabCase,
      transformer: path,
    },
  ]);

  return { ...opts, projectDir: join(process.cwd(), opts.projectName) };
}

export { buildOptions };
