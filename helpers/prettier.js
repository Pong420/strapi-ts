const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

let defaultOptions = {};

const content = fs.readFileSync(
  path.join(__dirname, '../.prettierrc'),
  'utf-8'
);

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
function formatCode(code, options) {
  return prettier.format(code, { ...defaultOptions, ...options });
}

module.exports = { formatCode };
