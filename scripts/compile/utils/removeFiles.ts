import fs from 'fs/promises';
import glob from 'globby';

export async function removeFiles(patterns: string[], dir: string) {
  const files = await glob(patterns, {
    dot: true,
    cwd: dir,
    absolute: true
  });
  await Promise.all(files.map(file => fs.rmdir(file, { recursive: true })));
}
