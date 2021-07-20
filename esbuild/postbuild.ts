import fs from 'fs';
import path from 'path';
import type { Plugin } from 'esbuild';

interface Copy {
  srcDir: string;
  outDir: string;
}

async function copy(srcDir: string, outDir: string) {
  const files = await fs.promises.readdir(srcDir);

  outDir = path.resolve(srcDir, path.relative(srcDir, outDir));

  if (!fs.existsSync(outDir)) {
    await fs.promises.mkdir(outDir);
  }

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const outPath = path.join(outDir, file);
    const stat = await fs.promises.lstat(srcPath);

    if (stat.isDirectory()) {
      if (file.includes('node_modules')) continue;
      if (!fs.existsSync(outPath)) {
        await fs.promises.mkdir(outPath);
      }
      await copy(srcPath, outPath);
    } else {
      if (
        !['.ts'].includes(path.extname(file)) &&
        !file.includes('eslint') &&
        !file.includes(`routes.json`)
      ) {
        await fs.promises.copyFile(srcPath, outPath);
      }
    }
  }
}

export function postbuild({ srcDir, outDir }: Copy) {
  const plugin: Plugin = {
    name: 'copy',
    setup(build) {
      build.onEnd(async () => {
        await copy(
          path.resolve(__dirname, '..', srcDir),
          path.resolve(__dirname, '..', outDir)
        );

        const packageJSONPath = path.resolve(
          __dirname,
          '..',
          `${outDir}/package.json`
        );

        const packageJSON = await fs.promises
          .readFile(packageJSONPath, 'utf-8')
          .then(JSON.parse)
          .catch(() => {});

        await fs.promises.writeFile(
          packageJSONPath,
          JSON.stringify(
            { ...packageJSON, name: packageJSON.name.replace(/\/.*/, '/app') },
            null,
            2
          )
        );
      });
    }
  };
  return plugin;
}
