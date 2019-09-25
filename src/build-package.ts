/**
 * clean up package.json
 */

import { join } from 'path';
import { write } from './util';

async function buildPackage(projectDir: string): Promise<void> {
  const pkgPath = join(projectDir, 'package.json');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(pkgPath);

  const overrides = {
    version: '0.1.0',
    description: '',
    repository: {
      type: 'git',
      url: '',
    },
    author: '',
    keywords: [] as string[],
    bugs: {
      url: '',
    },
    homepage: '',
  };

  const data = JSON.stringify(
    {
      ...pkg,
      ...overrides,
    },
    null,
    2,
  );

  return write(pkgPath, data);
}

export { buildPackage };
