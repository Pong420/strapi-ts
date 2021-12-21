import fs from 'fs/promises';
import path from 'path';
import * as esbuild from 'esbuild';
import { Loader } from '../loader';
import { handleError } from '../utils/errors';
import { outDirName, srcDirName } from '../../constants';
import { constants } from '../plugins/constants';
import { resolvePathAlias } from '../plugins/resolvePathAlias';
import packageJSON from '../../../strapi/package.json';

export const external = Object.keys(packageJSON.dependencies);

const defaultConfig: esbuild.BuildOptions = {
  platform: 'node',
  target: 'node14',
  format: 'cjs',
  sourcemap: 'inline',
  keepNames: true,
  splitting: false,
  bundle: false,
  write: false,
  color: true,
  outbase: srcDirName,
  outdir: outDirName,
  plugins: [constants(), resolvePathAlias()]
};

export const tsFilesPattern = '**/*.{ts,tsx}';

export interface TypescriptLoaderOptions {
  ignorePatterns?: string[];
  config?: Partial<esbuild.BuildOptions>;
}

export class TypescriptLoader extends Loader {
  static patterns = tsFilesPattern;

  config: esbuild.BuildOptions;

  constructor({ ignorePatterns, config }: TypescriptLoaderOptions = {}) {
    super();

    ignorePatterns = Array.isArray(ignorePatterns)
      ? ignorePatterns
      : [ignorePatterns];

    this.patterns = [tsFilesPattern, ...ignorePatterns.map(i => `!${i}`)];
    this.config = { ...defaultConfig, ...config };

    if (this.config.bundle) {
      this.config.external = [...(this.config.external || []), ...external];
    }
  }

  async use(entryPoints: string[]) {
    const result = await esbuild.build({
      ...this.config,
      entryPoints: entryPoints.map(e => `${srcDirName}/${e}`)
    });

    if (result.errors.length)
      return handleError(new Error(result.errors[0].text));
    if (!result.outputFiles) return handleError(new Error('No output files'));

    await Promise.all(
      result.outputFiles.map(async file => {
        const dir = path.dirname(file.path);
        const contents = file.text;
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(file.path, contents, {
          encoding: 'utf8',
          mode: contents[0] === '#' && contents[1] === '!' ? 0o755 : undefined
        });
      })
    );
  }
}
