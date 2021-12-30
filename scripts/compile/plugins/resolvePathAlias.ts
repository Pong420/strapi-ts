import path from 'path';
import { outDirName } from '../../constants';
import type { Plugin, BuildResult } from 'esbuild';

const cache = new Map<string, string>();

export const resolvePathAlias = () => {
  function onEnd(result: BuildResult) {
    result.outputFiles = result.outputFiles?.map(args => {
      let alias = cache.get(args.path);
      if (!alias) {
        alias = path.relative(path.dirname(args.path), outDirName) || '.';
        cache.set(args.path, alias);
      }

      return {
        ...args,
        text: args.text.replace(
          /(?<=require\().+?(?=\))|(?<=import.*from).+?(?=['|"])/gm,
          s => s.replace('@/', `${alias}/`)
        )
      };
    });
  }

  const plugin: Plugin = {
    name: 'resolve-path-alias',
    setup(build) {
      build.onEnd(onEnd);
    }
  };

  return plugin;
};
