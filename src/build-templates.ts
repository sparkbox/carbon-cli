/**
 * search/replace in project files
 */

import { renderFile } from 'ejs';
import { run, write } from './util';
import { ProjectOptions } from './types';

async function buildTemplates(options: ProjectOptions): Promise<void[]> {
  const templateFiles = await run(`egrep -lr '<%.*%>' ${options.projectDir} || true`);
  const templates = templateFiles.split('\n').filter(Boolean);
  return Promise.all(templates.map(file => render(file, options)));
}

function render(file: string, options: ProjectOptions): Promise<void> {
  return new Promise((resolve, reject): void => {
    renderFile(file, options, null, (err, str) => {
      if (err) reject(err);
      write(file, str)
        .then(resolve)
        .catch(reject);
    });
  });
}

export { buildTemplates };
