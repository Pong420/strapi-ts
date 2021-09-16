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

const entryPoints = ['**/*.{ts,tsx}', '!**/node_modules', '!**/*.d.ts'];

const watchPatterns = [...entryPoints];

const staticPatterns = [
  '**/*',
  '!**/*.{ts,tsx}',
  '!node_modules',
  '!package.json'
];

const routeMapPath = `${srcDirName}/tests/helpers/routes.ts`;
const ignoreWatch = ['scripts', 'docs', '${srcDirName}/types', routeMapPath];

const enableWatch = process.argv.includes('--watch');

const config = defineConfig({
  target: 'node14',
  entryPoints: entryPoints.map(e =>
    e.startsWith('!') ? e : `${srcDirName}/${e}`
  ),
  ignoreWatch,
  outDir: outDirName,
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

async function copyStaticFiles() {
  const staticFiles = await glob(staticPatterns, { cwd: srcDir, dot: true });
  await Promise.all(staticFiles.map(copy));
}

const remove = (file: string) => {
  const outFilePath = path.join(outDir, file.replace(/\.ts(x)?$/, '.js'));
  return fs.rm(outFilePath, { recursive: true, force: true });
};

async function patchPackageJSON() {
  const content = {
    ...packageJSON,
    name: packageJSON.name.replace(/\/.*/, '/app')
  };
  await fs.writeFile(
    path.join(outDir, `package.json`),
    JSON.stringify(content, null, 2)
  );
}

async function run() {
  await build({ ...config, clean: ['!build/*', '!.cache'] });

  // post build
  await Promise.all([
    copyStaticFiles(),
    patchPackageJSON(),
    genStrapiRunTimeDts({ enableWatch }),
    genRouteMetadata({ enableWatch, routeMapPath })
  ]);

  if (!enableWatch) return;

  let entryFiles = await glob(entryPoints, { cwd: srcDir });

  const watcher = watch(watchPatterns, {
    cwd: srcDir,
    ignoreInitial: true,
    ignored: ['**/{.git,node_modules}/**', outDir, ...ignoreWatch]
  });

  const filesChanged = new Set<string>();
  const staticFilesChanged = new Set<string>();

  const debouncedBuildAll = debouncePromise(
    async () => {
      await Promise.all([
        filesChanged.size
          ? build({
              ...config,
              entryPoints: [...filesChanged].map(filePath =>
                path.join(srcDir, filePath)
              )
            })
          : Promise.resolve(),
        [...staticFilesChanged].map(filePath => copy(filePath))
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
        if (/\.ts(x)?$/.test(file)) {
          entryFiles.push(file);
          filesChanged.add(file);
        } else {
          staticFilesChanged.add(file);
        }
        break;
      case 'change':
        entryFiles.includes(file)
          ? filesChanged.add(file)
          : staticFilesChanged.add(file);
        break;
      case 'unlink':
        entryFiles = entryFiles.filter(f => f !== file);
        remove(file);
        break;
      case 'unlinkDir':
        remove(file);
        break;
    }
    debouncedBuildAll();
  });
}

run();
