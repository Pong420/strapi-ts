import fs from 'fs/promises';
import path from 'path';
import { upperFirst, camelCase } from 'lodash';
import { formatTs } from './prettier';

const schemaTemplate = (name: string) => {
  const _interface = `I${name}`;
  const _schema = `${name}Schema`;
  return formatTs(
    `
    import Joi, { AnySchema } from '@/schema/joi';
    import { ${_interface} } from '@/typings';

    export const ${name}: Record<keyof ${_interface}, AnySchema> = {

    };

    export const ${_schema} = Joi.object<${_interface}>(${name});

    export function is${name}(payload: unknown): payload is ${_interface} {
      const result = ${_schema}.validate(payload);
      return !result.error;
    }
  `
  );
};

export async function createSchemaFile(name: string, type = '') {
  name = upperFirst(camelCase(name));
  const dir = path.join(__dirname, `../strapi/schema/${type}`);
  const content = await schemaTemplate(name);
  await fs.access(dir).catch(() => fs.mkdir(dir, { recursive: true }));
  await fs.writeFile(`${dir}/${name}.ts`, content);
}

const [, , name] = process.argv;

createSchemaFile(name).catch(console.error);
