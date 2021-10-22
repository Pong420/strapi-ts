import path from 'path';
import minimatch from 'minimatch';
import { FileSystem } from './utils/fileSystem';
import { srcDir, outDir } from '../constants';

const _match = (list: string[], pattern: string) =>
  minimatch.match(list, pattern, { dot: true });

export const fileSystem = new FileSystem();

export abstract class Loader {
  initialized = false;
  files = new Set<string>();
  patterns: string | string[] = [];

  abstract use(files: string[]): Promise<void>;

  onRemove?(file: string): void;

  constructor(patterns?: string | string[]) {
    if (patterns) {
      this.patterns = patterns;
    }
  }

  async readFile(filepath: string, encoding: 'utf-8'): Promise<string>;
  async readFile(filepath: string): Promise<Buffer>;
  async readFile(
    sourcePath: string,
    encoding?: BufferEncoding
  ): Promise<string | Buffer> {
    const filepath = path.join(srcDir, sourcePath);
    const file = await fileSystem.read(filepath);
    if (encoding) {
      return file.contents.toString(encoding);
    }
    return file.contents;
  }

  writeFile(outPath: string, contents: string | Buffer) {
    const filepath = path.join(outDir, outPath);
    return fileSystem.write(filepath, contents);
  }

  writeSourceFile(outPath: string, contents: string | Buffer) {
    const filepath = path.join(srcDir, outPath);
    return fileSystem.write(filepath, contents);
  }
}

export function createProcessor(loaders: Loader[]) {
  return async function processLoaders(_files: string[]) {
    fileSystem.version += 1;

    const processes: Promise<void>[] = [];

    for (const loader of loaders) {
      const patterns = Array.isArray(loader.patterns)
        ? loader.patterns
        : [loader.patterns];

      const ignorePatterns = patterns.filter(p => p.startsWith('!'));
      const filterPatterns = patterns.filter(p => !p.startsWith('!'));

      let files = ignorePatterns.reduce((list, p) => _match(list, p), _files);
      files = filterPatterns.reduce(
        (results, p) => [...results, ..._match(files, p)],
        []
      );

      if (loader.initialized) {
        files.forEach(f => loader.files.add(f));
      } else {
        loader.initialized = true;
        loader.files = new Set(files);
      }

      if (files.length) {
        processes.push(loader.use(files));
      }
    }

    await Promise.all(processes);
  };
}
