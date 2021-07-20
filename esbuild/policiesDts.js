// @ts-check
const fs = require('fs');
const path = require('path');
const glob = require('globby');
const { formatCode } = require('../helpers/prettier');

/**
 * @param {string} srcDir
 */
const getPolicies = async srcDir => {
  const files = await glob([`**/policies/*.ts`], { cwd: srcDir });
  const policies = files.reduce(
    /**
     * @param {string[]} policies
     */
    (policies, file) => {
      const name = path.basename(file).replace('.ts', '');
      const key = file.startsWith('config')
        ? `global::${name}`
        : file.startsWith('extensions')
        ? `plugins::${file.split('/')[1]}.${name}`
        : `${file.split('/')[1]}.${name}`;
      return [...policies, key, name];
    },
    []
  );
  return policies;
};

/**
 * @param {string} value
 */
const idx = value =>
  value.indexOf(`global::`) === -1
    ? value.indexOf('plugins::') === -1
      ? value.indexOf('.') === -1
        ? 1
        : 2
      : 3
    : 4;

/**
 * @param {string} srcDir
 */
const genPoliciesDts = srcDir => {
  /**
   * @type {import('esbuild').Plugin}
   */
  const plugin = {
    name: 'generate-policies',
    setup(build) {
      build.onStart(async () => {
        const defaultPolices = [
          'plugins::users-permissions.isAuthenticated',
          'plugins::users-permissions.ratelimit'
        ];
        const customPolicies = await getPolicies(srcDir);

        let policies = [...defaultPolices, ...customPolicies];
        policies = [...new Set(policies)];
        policies = policies.sort((a, b) => idx(b) - idx(a));

        const filePath = path.relative(srcDir, __filename);
        const content = `
          /**
           * This file is auto-generated by "${filePath}" 
           */

          declare type IPolicies = '${policies.join("' | '")}' 
        `;

        const dist = path.resolve(
          __dirname,
          '../',
          srcDir,
          'types',
          'policies.d.ts'
        );

        await fs.promises.writeFile(
          dist,
          formatCode(content, { parser: 'typescript' })
        );
      });
    }
  };
  return plugin;
};

module.exports = { genPoliciesDts };