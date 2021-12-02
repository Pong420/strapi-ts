import fs from 'fs/promises';
import path from 'path';
import { Loader } from '../loader';
import { root, srcDir } from '../../constants';
import { formatTs } from '../../prettier';

let apiNames = '';
let policiesTypes = '';

async function writeFile() {
  const contents = [apiNames, policiesTypes];

  let content = `
      /**
       * This file is auto-generated by "${__filename.slice(root.length)}"
       */
  `;

  for (const value of contents) {
    if (!value) return;
    content += '\n' + value + '\n';
  }

  const formatted = await formatTs(content);
  await fs.writeFile(path.join(srcDir, 'types/strapi-runtime.d.ts'), formatted);
}

export class ApiNamesLoader extends Loader {
  patterns = ['**/api/**/*.settings.json'];

  async use() {
    const files = [...this.files];
    const names = files
      .map(sourcePath =>
        path.basename(sourcePath).replace('.settings.json', '')
      )
      .sort((a, b) => a.localeCompare(b));

    apiNames = `declare type IApiNames = '${names.join("' | '")}'`;

    await writeFile();
  }

  onRemove() {
    this.use();
  }
}

export class PolicesLoader extends Loader {
  patterns = [`**/policies/*.ts`];

  defaultPolicies = [
    'plugins::users-permissions.isAuthenticated',
    'plugins::users-permissions.ratelimit'
  ];

  getPolicyIdx(value: string) {
    switch (true) {
      case value.startsWith(`global::`):
        return 4;
      case value.startsWith(`plugins::`):
        return 3;
      case value.indexOf('.') !== -1:
        return 2;
      default:
        return 1;
    }
  }

  async use() {
    const files = this.files;
    const policies = new Set(this.defaultPolicies);
    for (const sourcePath of files) {
      const name = path.basename(sourcePath).replace('.ts', '');
      if (sourcePath.startsWith('config')) {
        policies.add(`global::${name}`);
      } else if (sourcePath.startsWith('extensions')) {
        policies.add(`plugins::${sourcePath.split('/')[1]}.${name}`);
      } else {
        policies.add(`${sourcePath.split('/')[1]}.${name}`);
        policies.add(name);
      }
    }

    const sorted = [...policies].sort((a, b) => {
      const diff = this.getPolicyIdx(b) - this.getPolicyIdx(a);
      return diff === 0 ? b.localeCompare(a) : diff;
    });

    policiesTypes = `declare type IPolicies = '${sorted.join("' | '")}';`;

    await writeFile();
  }

  onRemove() {
    this.use();
  }
}

export const strpiRuntimeLoaders = [new PolicesLoader(), new ApiNamesLoader()];