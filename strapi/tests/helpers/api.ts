import * as supertest from 'supertest';
import { routeMap } from './routes';
import { generatePath } from './generatePath';

type RouteMap = typeof routeMap;

type CreateTest = (args?: any) => supertest.Test;

export type Tests = {
  [K in keyof RouteMap]: Record<keyof RouteMap[K], CreateTest>;
};

supertest.Test.prototype.token = function (token) {
  return this.set('Authorization', token ? `bearer ${token}` : '');
};

supertest.Test.prototype.multipart = function () {
  return this.set('Content-Type', 'multipart/form-data');
};

export function createTestApi(request: supertest.SuperTest<supertest.Test>) {
  const tests = {} as Tests;
  for (const key in routeMap) {
    const map = routeMap[key];
    for (const handler in map) {
      const { method, path } = map[handler];
      tests[key] = {
        ...tests[key],
        [handler]: (arg = {}) => {
          const httpMethod = method.toLowerCase();
          return request[httpMethod](generatePath(path, arg));
        }
      };
    }
  }
  return tests;
}
