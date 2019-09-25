import fs from 'fs';
import test from 'ava';
import tempy from 'tempy';
import mockPackage from './mocks/mock-packageJson';
import { buildPackage } from '../src/build-package';

test('build templates', async t => {
  // scaffold dummy files for templating
  const testDir = tempy.directory();
  const testPackage = `${testDir}/package.json`;
  fs.writeFileSync(testPackage, JSON.stringify(mockPackage, null, 2));

  await buildPackage(testDir);

  const cleanPackage = JSON.parse(fs.readFileSync(testPackage, 'utf-8'));

  t.deepEqual(cleanPackage, {
    name: '<%= projectName %>',
    version: '0.1.0',
    description: '',
    repository: {
      type: 'git',
      url: '',
    },
    author: '',
    keywords: [],
    bugs: {
      url: '',
    },
    homepage: '',
  });
});
