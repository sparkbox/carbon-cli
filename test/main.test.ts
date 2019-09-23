import test from 'ava';
import execa from 'execa';

test('carbon runs successfully', async t => {
  const { exitCode, exitCodeName } = await execa('ts-node', ['./src/main']);
  t.is(exitCode, 0);
  t.is(exitCodeName, 'SUCCESS');
});
