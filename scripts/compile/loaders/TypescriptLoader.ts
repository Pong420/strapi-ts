import fs from 'fs/promises';
import path from 'path';
import esbuild from 'esbuild';
import { Loader } from '../loader';
import { handleError } from '../utils/errors';
import { outDirName, srcDirName } from '../../constants';
import { constants } from '../plugins/constants';
import { resolvePathAlias } from '../plugins/resolvePathAlias';

const config: esbuild.BuildOptions = {
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

export class TypescriptLoader extends Loader {
  patterns = tsFilesPattern;

  async use(entryPoints: string[]) {
    const result = await esbuild.build({
      ...config,
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
