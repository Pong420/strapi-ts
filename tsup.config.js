// @ts-check
import { defineConfig } from 'tsup';
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
  outDir,
  entryPoints: ['strapi/**/*.{ts,tsx}', '!strapi/node_modules', '!**/*.d.ts'],
  esbuildPlugins: [
    genRouteMetadata({ routeMapPath }),
    resolvePathAlias(outDir),
    genStrapiRunTimeDts(srcDir),
    constants({ srcDir }),
    postbuild({ srcDir, outDir })
  ],
  ignoreWatch: ['strapi/types', 'scripts', 'docs', routeMapPath],
  bundle: false,
  // @ts-expect-error
  sourcemap: 'inline',
  keepNames: true,
  splitting: false,
  clean: watchMode ? false : ['!build/*', '!.cache']
});
