import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

export const read = promisify(readFile);
export const write = promisify(writeFile);
