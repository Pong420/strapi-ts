import fs from 'fs/promises';
import path from 'path';
import glob from 'globby';
import { watch } from 'chokidar';
import { debouncePromise } from './utils/debouncePromise';
import { handleError } from './utils/errors';
import { removeFiles } from './utils/removeFiles';
import { createProcessor } from './loader';
import { StaticFilesLoader } from './loaders/StaticFilesLoader';
import { TypescriptLoader, tsFilesPattern } from './loaders/TypescriptLoader';
import { RouteMetadataLoader } from './loaders/RouteMetadataLoader';
import {
  PackageJsonLoader,
  packageJsonPattern
} from './loaders/PackageJsonLoader';
import { strpiRuntimeLoaders } from './loaders/StrapiRuntimeDtsLoader';
import { srcDir, outDir } from '../constants';

const watchPatterns = ['**/*', '!**/node_modules', '!**/*.d.ts'];
const ignoreWatch = [RouteMetadataLoader.routeMapPath];

const enableWatch = process.argv.includes('--watch');

const loaders = [
  new StaticFilesLoader({
    ignorePatterns: [packageJsonPattern, tsFilesPattern]
  }),
  new TypescriptLoader(),
  new RouteMetadataLoader(),
  new PackageJsonLoader(),
  ...strpiRuntimeLoaders
];

const remove = (file: string) => {
  loaders.forEach(loader => {
    const deleted = loader.files.delete(file);
    deleted && loader.onRemove?.(file);
  });
  const outFilePath = path.join(outDir, file.replace(/\.ts(x)?$/, '.js'));
  return fs.rm(outFilePath, { recursive: true, force: true });
};

const processor = createProcessor(loaders);

async function run() {
  const globOptions = {
    dot: true,
    cwd: srcDir
  };

  if (!enableWatch) {
    await removeFiles(
      ['**/*', '!build', '!.cache', '!public/uploads', '!node_modules'],
      outDir
    );
  }

  let entryFiles = await glob(watchPatterns, {
    ...globOptions
  });

  await processor(entryFiles);

  if (!enableWatch) return;

  const watcher = watch(watchPatterns, {
    ...globOptions,
    ignoreInitial: true,
    ignored: ['**/{.git,node_modules}/**', ...ignoreWatch]
  });

  const filesChanged = new Set<string>();

  const debouncedBuildAll = debouncePromise(
    async () => {
      if (filesChanged.size) {
        await processor([...filesChanged]);
      }
      filesChanged.clear();
    },
    100,
    handleError
  );

  watcher.on('all', function handler(type, file) {
    switch (type) {
      case 'add':
        entryFiles.push(file);
        filesChanged.add(file);
        break;
      case 'change':
        filesChanged.add(file);
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
