import { defineConfig } from 'tsup';
import { clean } from './esbuild/clean';
import { resolvePathAlias } from './esbuild/resolvePathAlias';
import { genRouteMetadata } from './esbuild/routeMetadata';
import { genPoliciesDts } from './esbuild/policiesDts';
import { constants } from './esbuild/constants';
import { postbuild } from './esbuild/postbuild';
import { compilerOptions } from './tsconfig.json';

const srcDir = 'strapi';
const outDir = compilerOptions.outDir;

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
