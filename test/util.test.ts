import fs from 'fs';
import test from 'ava';
import tempy from 'tempy';
import { password, kebabCase, startCase, tarUrl, write } from '../src/util';

test('password', t => {
  const hiddenText = password('secret');
  t.is(hiddenText, '◦◦◦◦◦◦');
});

test('kebabCase', t => {
  const hyphenatedText = kebabCase('These Are Words');
  t.is(hyphenatedText, 'these-are-words');
});

test('startCase', t => {
  const humanText = startCase('these-are-words');
  t.is(humanText, 'These Are Words');
});

test('tarUrl', t => {
  const url = tarUrl('my-repo');
  t.is(url, 'https://api.github.com/repos/sparkbox/my-repo/tarball/master');
});

test('write is a promisified fs.write', async t => {
  const testDir = tempy.directory();
  const testFile = `${testDir}/test-file`;
  const promiseWrite = write(testFile, 'some-data');
  t.assert(promiseWrite instanceof Promise);
  await promiseWrite;
  t.is(fs.readFileSync(testFile, 'utf-8'), 'some-data');
});
