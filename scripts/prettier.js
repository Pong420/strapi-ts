const fs = require('fs/promises');
const path = require('path');
const prettier = require('prettier');

/**
 * @param {string} code
 * @param {prettier.Options} [options]
 * @returns
 */
export async function formatCode(code, options) {
  const defaultOptions = await fs
    .readFile(path.join(__dirname, '../.prettierrc'), 'utf-8')
    .then(JSON.parse)
    .catch(() => ({}));

  return prettier.format(code, { ...defaultOptions, ...options });
}
