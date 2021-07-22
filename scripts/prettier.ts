import fs from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

let defaultOptions: prettier.Options | null = null;

export function createFormatter(presetOptions?: prettier.Options) {
  return async function formatter(code: string, options?: prettier.Options) {
    if (!defaultOptions) {
      defaultOptions = await fs
        .readFile(path.join(__dirname, '../.prettierrc'), 'utf-8')
        .then(JSON.parse)
        .catch(() => ({}));
    }

    return prettier.format(code, {
      parser: 'typescript',
      ...defaultOptions,
      ...presetOptions,
      ...options
    });
  };
}

export const formatCode = createFormatter();
export const formatTs = createFormatter({ parser: 'typescript' });
