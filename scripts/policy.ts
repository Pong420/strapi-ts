import fs from 'fs/promises';
import path from 'path';
import glob from 'globby';
import { upperFirst, camelCase } from 'lodash';
import { formatTs } from './prettier';

const policyTemplate = (name: string, path: string) => {
  name = upperFirst(camelCase(name));
  const _schema = `${name}Schema`;
  return formatTs(
    `
    import { createSchemaPolicy } from '@/schema';
    import { ${_schema} } from '@/schema/${path}';
    
    module.exports = createSchemaPolicy(${_schema}, 'body');
  `
  );
};

export async function createPolicyFile(name: string) {
  if (name.startsWith('is')) {
    name = name.slice(2);
  }

  name = upperFirst(camelCase(name));

  const schemas = await glob([`**/${name}.ts`], {
    cwd: path.resolve(__dirname, '../strapi/schema')
  });

  if (!schemas || !schemas.length) {
    throw new Error(`schema ${name}.ts not found`);
  }

  const fileName = `is${upperFirst(camelCase(name))}`;
  const dir = path.join(__dirname, `../strapi/config/policies`);
  const content = await policyTemplate(name, schemas[0].replace(/\.ts$/, ''));
  await fs.access(dir).catch(() => fs.mkdir(dir, { recursive: true }));
  await fs.writeFile(`${dir}/${fileName}.ts`, content);
}

const [, , name] = process.argv;

createPolicyFile(name).catch(error => console.error(error.message));
