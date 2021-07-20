import glob from 'globby';
import { unlink } from 'fs/promises';
import type { Plugin } from 'esbuild';

export const clean = (patterns: string[]) => {
  const plugin: Plugin = {
    name: 'clean',
    setup(build) {
      const { outdir } = build.initialOptions;
      if (!outdir) return;

      const removeFiles = async () => {
        const files = await glob(patterns, {
          cwd: outdir,
          absolute: true
        });
        await Promise.all(files.map(file => unlink(file)));
      };

      build.onStart(removeFiles);
    }
  };
  return plugin;
};
