import fs from 'fs/promises';
import path from 'path';

interface File {
  version: number;
  contents: Buffer;
}

export class FileSystem {
  version = 0;

  cache = new Map<string, File>();

  async read(filepath: string) {
    let file = this.cache.get(filepath);
    if (!file || file.version !== this.version) {
      const contents = await fs.readFile(filepath);
      file = { contents, version: this.version };
      this.cache.set(filepath, file);
    }
    return file;
  }

  async write(filepath: string, contents: string | Buffer) {
    await fs.mkdir(path.dirname(filepath), { recursive: true });
    return fs.writeFile(filepath, contents);
  }
}
