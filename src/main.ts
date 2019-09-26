#!/usr/bin/env node

import ora from 'ora';
import { buildPackage } from './build-package';
import { buildTemplates } from './build-templates';
import { github, getRepos, createRepo } from './github';
import { buildOptions, confirmOptions } from './prompts';
import { message, reviewOptions, overview, tarUrl, run } from './util';

const { CARBON_CLI_TOKEN } = process.env;
const status = ora();

async function main(): Promise<void> {
  const gh = await github(CARBON_CLI_TOKEN);
  const repos = await getRepos(gh);
  const projectOptions = await buildOptions(repos.map(r => r.name));
  const { sourceRepo, branch, projectName, projectDir, shouldCreateRemote } = projectOptions;

  reviewOptions(projectOptions);
  const proceed = await confirmOptions();
  if (!proceed) return;

  status.start(`initialize repo`);
  await run(`mkdir ${projectName} && cd ${projectName} && git init`);
  status.succeed();

  status.start(`download ${sourceRepo}`);
  await run(`curl -Lk ${tarUrl(sourceRepo, branch)} | tar -C ${projectName} -x --strip-components=1`);
  status.succeed();

  status.start('tidy up package.json');
  await buildPackage(projectDir);
  status.succeed();

  status.start('customize project files');
  await buildTemplates(projectOptions);
  status.succeed();

  let newRemote;
  if (shouldCreateRemote) {
    status.start('create new remote on GitHub');
    newRemote = await createRepo(gh, projectName);
    await run(`
      cd ${projectDir} &&
      git remote add origin ${newRemote.ssh_url} &&
      git add . &&
      git commit --no-verify --no-gpg-sign -m "initial commit" &&
      git push -u origin master
    `);
    status.succeed();
  }

  // TODO: skipping install for now
  // status.start('install dependencies');
  // await run(`cd ${projectName} && npm i`);
  // status.succeed();

  overview(projectOptions, newRemote);
}

main().catch(e => {
  status.fail();
  message.error(e);
  // clean up here
  // await run(`rm -rf ${projectDir}`).catch(() => {});
  process.exit(1);
});
