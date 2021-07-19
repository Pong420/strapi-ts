const fs = require('fs/promises');
const glob = require('globby');

/**
 * @param {string[]} patterns
 */
const clean = patterns => {
  /**
   * @type {import('esbuild').Plugin}
   */
  const plugin = {
    name: 'clean',
    setup(build) {
      const { outdir } = build.initialOptions;
      if (!outdir) return;

      const removeFiles = async () => {
        const files = await glob(patterns, {
          cwd: outdir,
          absolute: true
        });
        await Promise.all(files.map(file => fs.unlink(file)));
      };

      build.onStart(removeFiles);
    }
  };

  return plugin;
};

module.exports = { clean };
