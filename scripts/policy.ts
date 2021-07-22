import fs from 'fs/promises';
import path from 'path';
import { upperFirst, camelCase, kebabCase } from 'lodash';
import { formatTs } from './prettier';

const policyTemplate = (name: string) => {
  name = upperFirst(camelCase(name));
  const _schema = `${name}Schema`;
  return formatTs(
    `
    import { createSchemaPolicy } from '@/schema';
    import { ${_schema} } from '@/schema/auth/${name}';
    
    module.exports = (ctx: KoaContext, next: KoaNext) => {
      return createSchemaPolicy(${_schema}, 'body')(ctx, next);
    };
  `
  );
};

export async function createPolicyFile(name: string) {
  const dir = path.join(__dirname, `../strapi/config/policies`);
  const content = await policyTemplate(name);
  await fs.access(dir).catch(() => fs.mkdir(dir, { recursive: true }));
  await fs.writeFile(`${dir}/is-${kebabCase(name)}.ts`, content);
}

const [, , name] = process.argv;

createPolicyFile(name).catch(console.error);
