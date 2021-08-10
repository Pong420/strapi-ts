/**
 * A patch for create / update /edit collection using the content type builder (Admin Panel)
 */

import fs from 'fs/promises';
import path from 'path';
import glob from 'globby';
import childProcess from 'child_process';
import { rootDir, srcDir } from '@/constants';

export function spawn(
  command: string,
  args: string[],
  options?: childProcess.SpawnOptions
) {
  const isWindows = process.platform === 'win32';
  const result = childProcess.spawnSync(
    isWindows ? command + '.cmd' : command,
    args,
    { stdio: 'inherit', ...options }
  );

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`Error while checking: ${command} ${args.join(' ')}`);
    process.exit(1);
  }
}

export function contentTypeBuilderPatch() {
  const instance =
    strapi.plugins['content-type-builder']['services']['contenttypes'];

  const apiDir = path.join(__dirname, '../../api');
  const srcApiDir = path.join(srcDir, 'api');

  for (const key in instance) {
    const prop = instance[key];
    if (typeof prop === 'function' && !['formatContentType'].includes(key)) {
      instance[key] = async function (...args: unknown[]) {
        // run the default function
        const result = await prop.call(this, ...args);
        const lastestApis = await fs.readdir(apiDir);

        if (key.startsWith('delete')) {
          const currentApis = await fs.readdir(srcApiDir);
          const diff = currentApis.filter(n => !lastestApis.includes(n));
          await Promise.all(
            diff.map(api =>
              fs.rm(path.join(srcDir, 'api', api), {
                recursive: true,
                force: true
              })
            )
          );
        } else if (key.startsWith('create')) {
          const currentApis = await fs.readdir(srcApiDir);
          const diff = lastestApis.filter(n => !currentApis.includes(n));
          const settingJSONs = await Promise.all(
            diff.map(async api => {
              // prettier-ignore
              const filePath = path.join(apiDir, api, 'models', `${api}.settings.json`);
              return { filePath, content: await fs.readFile(filePath) };
            })
          );

          for (const api of diff) {
            spawn('yarn', ['api', api], { cwd: rootDir });
          }

          await Promise.all(
            settingJSONs.map(async ({ filePath, content }) => {
              const dest = path.join(
                srcApiDir,
                path.relative(apiDir, filePath)
              );
              await fs.writeFile(dest, content);
            })
          );
        } else {
          const settingJSONs = await glob(['**/*.settings.json'], {
            cwd: apiDir
          });
          await Promise.all(
            settingJSONs.map(async filePath => {
              const dest = path.join(srcApiDir, filePath);
              await fs.mkdir(path.dirname(dest), { recursive: true });
              await fs.copyFile(
                path.join(apiDir, filePath),
                path.join(srcApiDir, filePath)
              );
            })
          );
        }

        return result;
      };
    }
  }
}
