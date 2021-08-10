import fs from 'fs';
import path from 'path';
import type { Plugin } from 'esbuild';

interface Options {
  srcDir: string;
  outDir: string;
}

async function copyPackageJSON(outDir: string) {
  const packageJSONPath = path.resolve(__dirname, `../${outDir}/package.json`);
  const packageJSON = await fs.promises
    .readFile(packageJSONPath, 'utf-8')
    .then(JSON.parse)
    .catch(() => ({}));

  await fs.promises.writeFile(
    packageJSONPath,
    JSON.stringify(
      { ...packageJSON, name: packageJSON.name.replace(/\/.*/, '/app') },
      null,
      2
    )
  );
}

export function postbuild({ outDir }: Options) {
  const plugin: Plugin = {
    name: 'postbuild',
    setup(build) {
      build.onEnd(async () => {
        await copyPackageJSON(outDir);
      });
    }
  };
  return plugin;
}
