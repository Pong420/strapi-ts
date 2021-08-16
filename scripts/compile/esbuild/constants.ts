import fs from 'fs/promises';
import { root, srcDir, outDir } from '../../constants';
import type { Plugin } from 'esbuild';

export const constants = () => {
  const plugin: Plugin = {
    name: 'constants',
    async setup(build) {
      const pretterConfig = await fs
        .readFile(`${root}/.prettierrc`, 'utf-8')
        .then(JSON.parse)
        .catch(() => ({}));

      build.onLoad({ filter: /constants\.ts$/ }, async result => {
        const content = await fs.readFile(result.path, 'utf-8');
        return {
          contents: content
            .replace('__rootDir__', root)
            .replace('__appDir__', outDir)
            .replace('__srcDir__', srcDir)
            .replace(/pretterConfig.*/m, s =>
              s.replace('{}', JSON.stringify(pretterConfig))
            ),
          loader: 'ts'
        };
      });
    }
  };

  return plugin;
};
