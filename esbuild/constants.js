// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * @param {{ srcDir: string }} payload
 */
const constants = ({ srcDir }) => {
  const rootDirPath = path.resolve(__dirname, '..');
  const srcDirPath = path.resolve(rootDirPath, srcDir);

  /**
   * @type {import('esbuild').Plugin}
   */
  const plugin = {
    name: 'constants',
    setup(build) {
      build.onLoad({ filter: /constants\.ts$/ }, async result => {
        const content = await fs.promises.readFile(result.path, 'utf-8');
        return {
          contents: content
            .replace(/__rootDir__/, rootDirPath)
            .replace(/__srcDir__/, srcDirPath),
          loader: 'js'
        };
      });
    }
  };

  return plugin;
};

module.exports = { constants };
