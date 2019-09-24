import { writeFile } from 'fs';
import { promisify } from 'util';

export const write = promisify(writeFile);
