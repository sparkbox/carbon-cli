#!/usr/bin/env node

import ora from 'ora';

const status = ora();

async function main(): Promise<void> {
  status.start(`it's alive`);
  status.succeed();
}

main().catch(e => {
  status.fail();
  console.error(e.stack);
  process.exit(1);
});
