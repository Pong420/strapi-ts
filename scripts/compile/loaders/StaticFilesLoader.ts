import { Loader } from '../loader';

export const staticFilesPatterns = ['**/*', '!**/node_modules'];

interface Options {
  ignorePatterns?: string | string[];
}

export class StaticFilesLoader extends Loader {
  constructor({ ignorePatterns = [] }: Options = {}) {
    super();
    const ignore = Array.isArray(ignorePatterns)
      ? ignorePatterns
      : [ignorePatterns];
    this.patterns = [...staticFilesPatterns, ...ignore.map(p => `!${p}`)];
  }

  async use(files: string[]) {
    await Promise.all(
      files.map(async sourcePath => {
        const contents = await this.readFile(sourcePath);
        return this.writeFile(sourcePath, contents);
      })
    );
  }
}
