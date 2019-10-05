/**
 * search/replace in project files
 */

import { renderFile } from 'ejs';
import { run, write } from './util';

async function buildTemplates(options: ProjectOptions): Promise<void[]> {
  const templateFiles = await run(`egrep -lr '<%=.+%>' ${options.projectDir} || true`);
  const templates = templateFiles.split('\n').filter(Boolean);
  return Promise.all(
    templates.map(file => {
      // for now, if a template fails to render,
      // we're assuming there's a valid reason and
      // letting it silently fail
      return render(file, options).catch(() => {});
    }),
  );
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
