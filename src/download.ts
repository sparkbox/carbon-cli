import { run } from './util';

async function download(archive: string, dest: string): Promise<string> {
  await run(`curl -Lk ${archive} -o ${dest}/__carbon_archive__`);
  if (archive.includes('.tar')) {
    return run(`cd ${dest} && tar -xf __carbon_archive__ -C . --strip-components=1 && rm __carbon_archive__`);
  } else if (archive.includes('.zip')) {
    return run(`extract zip`);
  }
}

export { download };
