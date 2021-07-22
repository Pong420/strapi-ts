import fs from 'fs/promises';
import path from 'path';
import globby from 'globby';
import { upperFirst, camelCase } from 'lodash';
import { formatTs } from './prettier';
import { spawn } from './spawn';

let [, , name] = process.argv;
name = name.toLowerCase();

const CamelName = upperFirst(camelCase(name));
const tsErrorRegex = /\/\/ @ts-expect-error.*\n/gm;
const tsIgnoreRegex = /\/\/ @ts-ignore.*\n/gm;

const getTemplate = (name: string, ext = 'ts') =>
  fs.readFile(path.resolve(__dirname, 'template', `${name}.${ext}`), 'utf-8');

const writeTemplate = async (
  type: string,
  dist: string,
  handler: (content: string) => string
) => {
  let content = await getTemplate(type);
  content = handler(
    content.replace(tsErrorRegex, '').replace(tsIgnoreRegex, '')
  );
  content = await formatTs(content);
  await fs.writeFile(dist, content);
};

async function run() {
  spawn('yarn', ['source', 'strapi', 'generate:api', name]);

  const root = path.resolve(__dirname, `../strapi/api/${name}`);
  const files = await globby([`**/*.js`], {
    cwd: root,
    absolute: true
  });
  await Promise.all(files.map(file => fs.unlink(file)));

  const { collectionName = '', kind = 'collectionType' } = await fs
    .readFile(`${root}/models/${name}.settings.json`, 'utf-8')
    .then(JSON.parse)
    .catch(() => ({}));

  await writeTemplate('controller', `${root}/controllers/${name}.ts`, content =>
    content
      .replace(/__apiName/g, name)
      .replace(/__ApiName/g, CamelName)
      .replace(/__ApiKind/g, upperFirst(kind))
      .replace(/__collectionName/g, collectionName)
  );

  await writeTemplate('model', `${root}/models/${name}.ts`, content => {
    return content
      .replace(/__apiName/g, name)
      .replace(/__IEntity/g, `I${CamelName}`);
  });

  await writeTemplate('service', `${root}/services/${name}.ts`, content =>
    content
      .replace(/__apiName/g, name)
      .replace(/__ApiKind/g, upperFirst(kind))
      .replace(/__IEntity/g, `I${CamelName}`)
  );

  const typingRoot = path.resolve(__dirname, `../strapi/typings`);
  const typingIndex = path.resolve(typingRoot, `index.ts`);
  const typingPath = path.resolve(typingRoot, `${name}.ts`);
  await fs.readFile(typingPath, 'utf-8').catch(async () => {
    await fs.writeFile(typingPath, `export interface I${CamelName} {}`);
    await fs.appendFile(typingIndex, `export * from './${name}';`);
  });
}

run();
