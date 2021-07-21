import fs from 'fs/promises';
import path from 'path';
import globby from 'globby';
import { spawn } from './spawn';

let [, , name] = process.argv;
name = name.toLowerCase();

spawn('yarn', ['source', 'strapi', 'generate:api', name]);

async function run() {
  const root = path.resolve(__dirname, `../strapi/api/${name}`);
  const files = await globby([`**/*.js`], { cwd: root, absolute: true });
  for (const file of files) {
    await fs.rename(file, file.replace(/\.js$/, '.ts'));
  }
}

run();
