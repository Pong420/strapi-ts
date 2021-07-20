import prettier from 'prettier';
import { readFileSync } from 'fs';
import { join } from 'path';

let defaultOptions = {};

const content = readFileSync(join(__dirname, '../.prettierrc'), 'utf-8');

try {
  defaultOptions = JSON.parse(content);
} catch {
  //
}

/**
 * @param {string} code
 * @param {prettier.Options} [options]
 * @returns
 */
export function formatCode(code, options) {
  return prettier.format(code, { ...defaultOptions, ...options });
}
