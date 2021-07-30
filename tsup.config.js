// @ts-check
import { defineConfig } from 'tsup';
import { clean } from './esbuild/clean';
import { resolvePathAlias } from './esbuild/resolvePathAlias';
import { genRouteMetadata } from './esbuild/routeMetadata';
import { genStrapiRunTimeDts } from './esbuild/strapiRunTimeDts';
import { constants } from './esbuild/constants';
import { postbuild } from './esbuild/postbuild';
import { compilerOptions } from './tsconfig.json';

const srcDir = 'strapi';
const outDir = compilerOptions.outDir;
const routeMapPath = `${srcDir}/tests/helpers/routes.ts`;
const watchMode = process.argv.includes('--watch');

export default defineConfig({
  entryPoints: ['strapi/**/*.{ts,tsx}', '!**/*.d.ts'],
  esbuildPlugins: [
    ...(watchMode
      ? []
      : [clean(['**/*', '!**/*.d.ts', '!build/*', '!.cache'])]),
    genRouteMetadata({ routeMapPath }),
    resolvePathAlias(outDir),
    genStrapiRunTimeDts(srcDir),
    constants({ srcDir }),
    postbuild({ srcDir, outDir })
  ],
  ignoreWatch: ['strapi/types', 'scripts', 'docs', routeMapPath],
  keepNames: true,
  splitting: false,
  clean: false,
  outDir
});
