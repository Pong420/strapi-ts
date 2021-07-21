import fs from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

export async function formatCode(code: string, options: prettier.Options) {
  const defaultOptions = await fs
    .readFile(path.join(__dirname, '../.prettierrc'), 'utf-8')
    .then(JSON.parse)
    .catch(() => ({}));
  return prettier.format(code, { ...defaultOptions, ...options });
}
