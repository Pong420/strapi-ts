import fs from 'fs/promises';
import path from 'path';
import glob from 'globby';
import { watch } from 'chokidar';
import { build, defineConfig } from 'tsup';
import { debouncePromise } from './debouncePromise';
import { handleError } from './errors';
import { genRouteMetadata } from './routeMetadata';
import { genStrapiRunTimeDts } from './strapiRunTimeDts';
import { resolvePathAlias } from './esbuild/resolvePathAlias';
import { constants } from './esbuild/constants';
import { srcDir, srcDirName, outDir, outDirName } from '../constants';
import packageJSON from '../../strapi/package.json';

const watchPatterns = [
  'strapi/**/*.{ts,tsx}',
  '!strapi/node_modules',
  '!**/*.d.ts'
];

const staticPatterns = [
  '**/*',
  '!**/*.{ts,tsx}',
  '!node_modules',
  '!package.json'
];

const enableWatch = process.argv.includes('--watch');

const routeMapPath = `${srcDirName}/tests/helpers/routes.ts`;
const ignoreWatch = ['strapi/types', 'scripts', 'docs', routeMapPath];

const config = defineConfig({
  outDir: outDirName,
  ignoreWatch,
  target: 'node14',
  entryPoints: watchPatterns,
  esbuildPlugins: [
    {
      name: 'esbuild-options',
      setup: build => {
        build.initialOptions.outbase = srcDirName;
      }
    },
    resolvePathAlias(),
    constants()
  ],
  bundle: false,
  // @ts-expect-error
  sourcemap: 'inline',
  keepNames: true,
  splitting: false
});

const copy = async (filePath: string) => {
  const src = path.join(srcDir, filePath);
  const dist = path.join(outDir, filePath);
  await fs.mkdir(path.dirname(dist), { recursive: true });
  await fs.copyFile(src, dist);
};

async function run() {
  const staticFiles = await glob(staticPatterns, { cwd: srcDir, dot: true });

  await build({ ...config, clean: ['!build/*', '!.cache'] });
  await Promise.all([
    genStrapiRunTimeDts({ enableWatch }),
    genRouteMetadata({ enableWatch, routeMapPath }),
    Promise.all(staticFiles.map(copy)).then(() => {
      const content = {
        ...packageJSON,
        name: packageJSON.name.replace(/\/.*/, '/app')
      };
      return fs.writeFile(
        path.join(outDir, `package.json`),
        JSON.stringify(content, null, 2)
      );
    })
  ]);

  if (!enableWatch) return;

  const entryFiles = await glob(watchPatterns);

  const watcher = watch(watchPatterns, {
    ignoreInitial: true,
    ignored: ['**/{.git,node_modules}/**', outDir, ...ignoreWatch]
  });

  const filesChanged = new Set<string>();
  const staticFilesChanged = new Set<string>();

  const debouncedBuildAll = debouncePromise(
    async () => {
      await Promise.all([
        filesChanged.size
          ? build({ ...config, entryPoints: [...filesChanged] })
          : Promise.resolve(),
        [...staticFilesChanged].map(copy)
      ]);

      filesChanged.clear();
      staticFilesChanged.clear();
    },
    100,
    handleError
  );

  watcher.on('all', function handler(type, file) {
    switch (type) {
      case 'add':
        /\.ts(x)?$/.test(file)
          ? filesChanged.add(file)
          : staticFilesChanged.add(file);
        break;
      case 'change':
        entryFiles.includes(file)
          ? filesChanged.add(file)
          : staticFilesChanged.add(file);
        break;
      case 'unlink':
        // TODO:
        break;
    }

    debouncedBuildAll();
  });
}

run();
