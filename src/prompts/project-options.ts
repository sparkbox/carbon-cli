/**
 * collect project options
 */

import { join } from 'path';
import { prompt, registerPrompt, Answers } from 'inquirer';
import autocomplete from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';
import { kebabCase, startCase, displayAsPath } from '../util';

registerPrompt('autocomplete', autocomplete);

async function buildOptions(repos: Repo[]): Promise<ProjectOptions> {
  const repoNames = repos.map(r => r.name);

  const { sourceRepoName } = await prompt([
    {
      type: 'autocomplete',
      name: 'sourceRepoName',
      message: 'search for a repo to replicate',
      source: fuzzyMatch(repoNames),
    },
  ]);

  const opts = await prompt([
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

  const sourceRepo = repos.find(r => r.name === sourceRepoName);
  const projectDir = join(process.cwd(), opts.projectName);

  return { ...opts, sourceRepo, projectDir };
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

function fuzzyMatch(repoNames: string[]) {
  return async (answers: Answers[], input: string): Promise<string[]> => {
    input = input || '';
    const fuzzyResult = fuzzy.filter(input, repoNames);
    return fuzzyResult.map(el => el.original);
  };
}

export { buildOptions, confirmOptions, fuzzyMatch };
