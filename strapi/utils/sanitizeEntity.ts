import type { Strapi } from 'strapi';
import { sanitizeEntity as sanitize } from 'strapi-utils';

type Key =
  | keyof Strapi['models']
  | keyof Strapi['plugins']['users-permissions']['models'];

type Callback<T> = (data: T) => any;

type Opts<T> =
  | Key
  | {
      key: Key;
      // the fields that transform file to url string
      imageUrls?: (keyof T)[];
    };

/**
 * The callback argument for a data is an array and need extra tranformation
 */
// prettier-ignore
export function sanitizeEntity<T>(data: T, opts: Opts<T>, callback?: Callback<T>): T;
// prettier-ignore
export function sanitizeEntity<T>(data: T[], opts: Opts<T>, callback?: Callback<T>): T[];
// prettier-ignore
export function sanitizeEntity<T>(data: T | T[], opts: Opts<T>, callback?: Callback<T>): T | T[] {
  const { key, imageUrls = [] } = typeof opts === 'string' ? { key: opts } : opts;
  const source = key === 'user' || key === 'role' || key === 'permission' ? 'users-permissions' : undefined
  const model = strapi.getModel(key, source);
  if (!model) throw new Error(`model not found`);

  if (Array.isArray(data)) {
    return data.map(d => sanitizeEntity(d, key, callback))
  }

  const result = sanitize(data, { model });

  imageUrls.forEach(key => {
    if (result[key]) {
      result[key] = result[key].url
    }
  })

  return callback ? callback(result) : result
}
