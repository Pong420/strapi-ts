// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/generatePath.js
import pathToRegexp from 'path-to-regexp';

const cache: Record<string, pathToRegexp.PathFunction> = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path: string) {
  if (cache[path]) return cache[path];

  const generator = pathToRegexp.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}

export function generatePath(path = '/', params: Record<string, unknown> = {}) {
  return path === '/' ? path : compilePath(path)(params);
}
