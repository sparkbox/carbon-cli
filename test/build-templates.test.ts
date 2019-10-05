import test from 'ava';
import tempy from 'tempy';
import { read, write } from '../src/util';
import { buildTemplates } from '../src/build-templates';

test('build templates', async t => {
  const testDir = tempy.directory();
  const testFile1 = `${testDir}/file-1`;
  const testFile2 = `${testDir}/file-2`;
  const testFile3 = `${testDir}/file-3`;
  await Promise.all([
    write(testFile1, '<%= projectName %>'),
    write(testFile2, '<%= projectNameHuman %>'),
    write(testFile3, 'no variables'),
  ]);

  const projectOptions = {
    projectDir: testDir,
    projectName: 'project-name',
    projectNameHuman: 'Project Name',
  };

  await buildTemplates(projectOptions);

  t.is(await read(testFile1, 'utf-8'), 'project-name');
  t.is(await read(testFile2, 'utf-8'), 'Project Name');
  t.is(await read(testFile3, 'utf-8'), 'no variables');
});

test('build templates fails silently', async t => {
  const testDir = tempy.directory();
  const testFile = `${testDir}/testfile}`;
  await write(testFile, '<%= nonExistent %>');

  const projectOptions = {
    projectDir: testDir,
    projectName: 'project-name',
    projectNameHuman: 'Project Name',
  };

  t.notThrows(() => buildTemplates(projectOptions));
});
