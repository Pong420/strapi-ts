import * as supertest from 'supertest';
import { routeMap } from './routes';
import { generatePath } from './generatePath';

type RouteMap = typeof routeMap;

type CreateTest = (args?: any) => supertest.Test;

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Tests = {
  [K in keyof RouteMap]: Record<keyof RouteMap[K], CreateTest>;
};

supertest.Test.prototype.token = function (payload) {
  const token = typeof payload === 'string' ? payload : payload?.jwt;
  return this.set('Authorization', token ? `bearer ${token}` : '');
};

supertest.Test.prototype.multipart = function () {
  return this.set('Content-Type', 'multipart/form-data');
};

export function createTestApi(request: supertest.SuperTest<supertest.Test>) {
  const tests = {} as Tests;
  for (const _key in routeMap) {
    const key = _key as keyof RouteMap;
    const map = routeMap[key];
    for (const handler in map) {
      const { method, path } = (map as any)[handler];
      tests[key] = {
        ...tests[key],
        [handler]: (arg = {}) => {
          try {
            const httpMethod = method.toLowerCase() as HttpMethod;
            return request[httpMethod](generatePath(path, arg));
          } catch (error) {
            console.error('generate path failure', path, arg);
            throw error;
          }
        }
      } as any;
    }
  }
  return tests;
}
