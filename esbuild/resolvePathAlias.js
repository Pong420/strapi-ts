const path = require('path');

/** @type {Map<string, string>} */
const cache = new Map();

/**
 * @param {string} outDir
 */
const resolvePathAlias = outDir => {
  /**
   * @type {import('esbuild').Plugin}
   */
  const plugin = {
    name: 'resolve-path-alias',
    setup(build) {
      build.onEnd(result => {
        result.outputFiles = result.outputFiles?.map(args => {
          let alias = cache.get(args.path);
          if (!alias) {
            alias = path.relative(path.dirname(args.path), outDir) || '.';
            cache.set(args.path, alias);
          }
          return {
            ...args,
            text: args.text.replace(/[require\(|from ]['|"]@\//gm, s =>
              s.replace('@/', `${alias}/`)
            )
          };
        });
      });
    }
  };

  return plugin;
};

module.exports = { resolvePathAlias };
