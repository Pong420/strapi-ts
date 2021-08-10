import fs from 'fs/promises';
import glob from 'globby';
import path from 'path';
import type { Plugin } from 'esbuild';

interface Options {
  srcDir: string;
  outDir: string;
  watch: boolean;
}

export const copyStatic = ({ srcDir, outDir, watch }: Options) => {
  srcDir = path.join(__dirname, '../', srcDir);
  outDir = path.join(__dirname, '../', outDir);

  const copy = async (filePath: string) => {
    const dest = path.join(outDir, filePath);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(path.join(srcDir, filePath), dest).catch(console.error);
  };

  let intialized = false;

  const plugin: Plugin = {
    name: 'copy-static',
    async setup() {
      if (intialized) return;
      intialized = true;

      const patterns = ['**/*', '!**/*.{ts,tsx}', '!node_modules'];
      if (watch) {
        const { default: chokidar } = await import('chokidar');
        const watcher = chokidar.watch(patterns, {
          cwd: srcDir,
          ignoreInitial: false
        });

        watcher.on('add', copy);
        watcher.on('change', copy);
      } else {
        const files = await glob(patterns, { cwd: srcDir, dot: true });
        await Promise.all(files.map(copy));
      }
    }
  };

  return plugin;
};
