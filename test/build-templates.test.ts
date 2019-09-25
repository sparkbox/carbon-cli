import fs from 'fs';
import test from 'ava';
import tempy from 'tempy';
import { buildTemplates } from '../src/build-templates';
import { ProjectOptions } from '../src/types';

test('build templates', async t => {
  // scaffold dummy files for templating
  const testDir = tempy.directory();
  const testFile1 = `${testDir}/file-1`;
  const testFile2 = `${testDir}/file-2`;
  const testFile3 = `${testDir}/file-3`;
  fs.writeFileSync(testFile1, '<%= projectName %>');
  fs.writeFileSync(testFile2, '<%= projectNameHuman %>');
  fs.writeFileSync(testFile3, 'no variables');

  const projectOptions: unknown = {
    projectDir: testDir,
    projectName: 'project-name',
    projectNameHuman: 'Project Name',
  };

  await buildTemplates(projectOptions as ProjectOptions);

  t.is(fs.readFileSync(testFile1, 'utf-8'), 'project-name');
  t.is(fs.readFileSync(testFile2, 'utf-8'), 'Project Name');
  t.is(fs.readFileSync(testFile3, 'utf-8'), 'no variables');
});
