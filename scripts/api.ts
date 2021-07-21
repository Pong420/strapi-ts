import fs from 'fs/promises';
import path from 'path';
import globby from 'globby';
import { upperFirst, camelCase } from 'lodash';
import { formatCode } from './prettier';
import { spawn } from './spawn';

let [, , name] = process.argv;
name = name.toLowerCase();

const tsErrorRegex = /\/\/ @ts-expect-error.*\n/gm;

const getTemplate = (name: string, ext = 'ts') =>
  fs.readFile(path.resolve(__dirname, 'template', `${name}.${ext}`), 'utf-8');

const serviceTemplate = async () => {
  let content = await getTemplate('service');
  content = content
    .replace(tsErrorRegex, '')
    .replace(/__serviceName/g, name)
    .replace(/__ServiceType/g, 'CollectionService')
    .replace(/__IEntity/g, `I${upperFirst(camelCase(name))}`);
  return formatCode(content, { parser: 'typescript' });
};

async function run() {
  spawn('yarn', ['source', 'strapi', 'generate:api', name]);

  const root = path.resolve(__dirname, `../strapi/api/${name}`);
  const files = await globby([`**/*.js`], {
    cwd: root,
    absolute: true
  });

  for (const file of files) {
    await fs.rename(file, file.replace(/\.js$/, '.ts'));
  }

  await serviceTemplate().then(content =>
    fs.writeFile(`${root}/services/${name}.ts`, content)
  );
}

run();
