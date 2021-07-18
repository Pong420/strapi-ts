// @ts-check
const path = require('path');

const outDir = 'app';

/** @type {Map<string, string>} */
const cache = new Map();

/**
 * @type {import('esbuild').Plugin}
 */
const resolvePathAlias = {
  name: 'resolve-path-alias',
  setup(build) {
    build.onEnd((result) => {
      result.outputFiles = result.outputFiles.map((args) => {
        let alias = cache.get(args.path);
        if (!alias) {
          alias = path.relative(path.dirname(args.path), outDir) || '.';
          cache.set(args.path, alias);
        }
        return {
          ...args,
          text: args.text.replace(/[require\(|from ]['|"]@\//gm, (s) =>
            s.replace('@/', `${alias}/`)
          ),
        };
      });
    });
  },
};

/**
 * @type {import("tsup").Options}
 */
module.exports = {
  entryPoints: ['strapi/**/*.{js,ts}'],
  esbuildPlugins: [resolvePathAlias],
  skipNodeModulesBundle: true,
  keepNames: true,
  splitting: false,
  clean: false,
  outDir,
  onSuccess: 'node postbuild.js',
};
