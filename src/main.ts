#!/usr/bin/env node

import ora from 'ora';
import { buildPackage } from './build-package';
import { buildTemplates } from './build-templates';
import { download } from './download';
import { GHClient } from './github';
import { buildOptions, confirmOptions } from './prompts';
import { message, reviewOptions, overview, run } from './util';

const { CARBON_CLI_TOKEN } = process.env;
const status = ora();

async function main(): Promise<void> {
  const { repos, getDownload, createRepo } = await GHClient({
    authToken: CARBON_CLI_TOKEN,
    org: 'sparkbox',
  });

  const projectOptions = await buildOptions(repos);
  const { sourceRepo, branch, projectName, projectDir, shouldCreateRemote } = projectOptions;
  const downloadLink = await getDownload(sourceRepo.name, branch);

  reviewOptions(projectOptions);
  const confirmation = await confirmOptions();
  if (!confirmation) {
    process.exit();
    return;
  }

  try {
    status.start(`initialize repo`);
    await run(`mkdir ${projectName} && cd ${projectName} && git init`);
    status.succeed();

    status.start(`download ${sourceRepo.name}`);
    await download(downloadLink, projectDir);
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
      newRemote = await createRepo(projectName);
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
  } catch (e) {
    await run(`rm -rf ${projectDir}`);
    status.fail(e);
    message.error(e);
    process.exit(1);
  }
}

main();
