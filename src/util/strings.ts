import path from 'path';
import chalk from 'chalk';

function kebabCase(text: string): string {
  return text.toLowerCase().replace(/\s/g, '-');
}

function startCase(text: string): string {
  return text
    .split('-')
    .map((word: string) => {
      const [first, ...rest] = word;
      return `${first.toUpperCase()}${rest.join('')}`;
    })
    .join(' ');
}

function password(text: string): string {
  return text
    .split('')
    .map(() => '◦')
    .join('');
}

function displayAsPath(newProjectDir: string): string {
  return `${chalk.gray(process.cwd() + path.sep)}${chalk.cyan(kebabCase(newProjectDir))}`;
}

function tarUrl(repoName: string, branch = 'master'): string {
  return `https://api.github.com/repos/sparkbox/${repoName}/tarball/${branch}`;
}

export { kebabCase, startCase, password, tarUrl, displayAsPath };
