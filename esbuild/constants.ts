import { promises } from 'fs';
import { resolve } from 'path';
import type { Plugin } from 'esbuild';

export const constants = ({ srcDir }: { srcDir: string }) => {
  const rootDirPath = resolve(__dirname, '..');
  const srcDirPath = resolve(rootDirPath, srcDir);

  const plugin: Plugin = {
    name: 'constants',
    setup(build) {
      build.onLoad({ filter: /constants\.ts$/ }, async result => {
        const content = await promises.readFile(result.path, 'utf-8');
        return {
          contents: content
            .replace(/__rootDir__/, rootDirPath)
            .replace(/__srcDir__/, srcDirPath),
          loader: 'js'
        };
      });
    }
  };

  return plugin;
};
