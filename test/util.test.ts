import test from 'ava';
import { password, kebabCase, startCase, tarUrl } from '../src/util';

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
