// @ts-check
const { clean } = require("./esbuild/clean");
const { resolvePathAlias } = require("./esbuild/resolvePathAlias");

const outDir = "app";

/**
 * @type {import("tsup").Options}
 */
module.exports = {
  entryPoints: ["strapi/**/*.ts", "!**/*.d.ts"],
  esbuildPlugins: [
    clean(["**/*", "!**/*.d.ts", "!build/*", "!.cache"]),
    resolvePathAlias(outDir),
  ],
  keepNames: true,
  splitting: false,
  clean: false,
  outDir,
  onSuccess: "node postbuild.js",
};
