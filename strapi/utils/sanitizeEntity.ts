import type { Strapi } from 'strapi';
import { sanitizeEntity as sanitize } from 'strapi-utils';

type Key =
  | keyof Strapi['models']
  | keyof Strapi['plugins']['users-permissions']['models'];

type Callback<T> = (data: T) => any;

/**
 * The callback argument for a data is an array and need extra tranformation
 */

// prettier-ignore
export function sanitizeEntity<T = any>(data: unknown, key: Key, callback?: Callback<T>): T;
// prettier-ignore
export function sanitizeEntity<T = any>(data: unknown[], key: Key, callback?: Callback<T>): T[];
// prettier-ignore
export function sanitizeEntity<T = any>(data: unknown | unknown[], key: Key, callback?: Callback<T>): T | T[] {
  const model =
    key === 'user' || key === 'role' || key === 'permission'
      ? strapi['plugins']['users-permissions']['models'][key]
      : strapi.models[key];
  if (!model) throw new Error(`model not found`);

  if (Array.isArray(data)) {
    return data.map(d => sanitizeEntity(d, key, callback))
  }
  
  const result = sanitize(data, { model });
  return callback ? callback(result): result
}
