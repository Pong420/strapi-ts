import { relative, dirname } from 'path';
import type { Plugin, BuildResult } from 'esbuild';

const cache = new Map<string, string>();

export const resolvePathAlias = (outDir: string) => {
  function onEnd(result: BuildResult) {
    result.outputFiles = result.outputFiles?.map(args => {
      let alias = cache.get(args.path);
      if (!alias) {
        alias = relative(dirname(args.path), outDir) || '.';
        cache.set(args.path, alias);
      }
      return {
        ...args,
        text: args.text.replace(
          /(\(require\(|^import (.*) from )['|"]@\//gm,
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
