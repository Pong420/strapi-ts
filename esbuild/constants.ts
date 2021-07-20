import fs from 'fs/promises';
import { resolve } from 'path';
import type { Plugin } from 'esbuild';

export const constants = ({ srcDir }: { srcDir: string }) => {
  const rootDirPath = resolve(__dirname, '..');
  const srcDirPath = resolve(rootDirPath, srcDir);

  const plugin: Plugin = {
    name: 'constants',
    async setup(build) {
      const pretterConfig = await fs
        .readFile(`${rootDirPath}/.prettierrc`, 'utf-8')
        .then(JSON.parse)
        .catch(() => {});

      build.onLoad({ filter: /constants\.ts$/ }, async result => {
        const content = await fs.readFile(result.path, 'utf-8');
        return {
          contents: content
            .replace('__rootDir__', rootDirPath)
            .replace('__srcDir__', srcDirPath)
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
