import path from 'path';
import { compilerOptions } from '../tsconfig.json';

export const root = path.resolve(__dirname, '../');
export const srcDirName = 'strapi';
export const outDirName = compilerOptions.outDir;

export const srcDir = path.join(root, srcDirName);
export const outDir = path.join(root, outDirName);
