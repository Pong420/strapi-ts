import { defineConfig } from 'tsup';
import { clean } from './esbuild/clean';
import { resolvePathAlias } from './esbuild/resolvePathAlias';
import { genRouteMetadata } from './esbuild/routeMetadata';
import { genPoliciesDts } from './esbuild/policiesDts';
import { constants } from './esbuild/constants';
import { postbuild } from './esbuild/postbuild';

const srcDir = 'strapi';
const outDir = 'app';

export default defineConfig({
  entryPoints: ['strapi/**/*.ts', '!**/*.d.ts', '!**/typings/*.ts'],
  esbuildPlugins: [
    clean(['**/*', '!**/*.d.ts', '!build/*', '!.cache']),
    genRouteMetadata,
    resolvePathAlias(outDir),
    genPoliciesDts(srcDir),
    constants({ srcDir }),
    postbuild({ srcDir, outDir })
  ],
  ignoreWatch: ['strapi/types'],
  keepNames: true,
  splitting: false,
  clean: false,
  outDir
});
