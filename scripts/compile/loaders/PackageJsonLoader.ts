import { Loader } from '../loader';

export const packageJsonPattern = '**/package.json';

export class PackageJsonLoader extends Loader {
  static patterns = packageJsonPattern;

  patterns = packageJsonPattern;

  async use(files: string[]) {
    for (const sourcePath of files) {
      const contents = await this.readFile(sourcePath, 'utf-8');
      const json = JSON.parse(contents);
      json.name = json.name.replace(/\/.*/, '/app');
      await this.writeFile(sourcePath, JSON.stringify(json, null, 2));
    }
  }
}
