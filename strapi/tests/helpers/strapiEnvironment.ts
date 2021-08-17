import path from 'path';
import http from 'http';
import supertest from 'supertest';
import globby from 'globby';
import NodeEnvironment from 'jest-environment-node';
import Strapi, { Strapi as StrapiInstance, MongoDBConfig } from 'strapi';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { testRegex } from '@/jest.e2e.config';
import { createTestApi } from './api';

const mongod = new MongoMemoryServer();

let instance: StrapiInstance | null = null;

let timeout: NodeJS.Timeout;

let total = -1;

const getTotalTestFiles = async () => {
  if (testRegex) {
    let patterns = typeof testRegex === 'string' ? [testRegex] : testRegex;
    patterns = patterns.map(p => `**/*${p}`.replace(/\$$/, ''));
    const files = await globby(patterns, {
      cwd: path.resolve(__dirname, '../')
    });
    return files.length;
  }
  return 0;
};

export default class StrapiEnvironment extends NodeEnvironment {
  async setup() {
    clearTimeout(timeout);

    await super.setup();

    if (total === -1) {
      total = await getTotalTestFiles();
    }

    /**
     * Since strapi start time too long, so web should reuse the instance
     */
    if (!instance) {
      await mongod.start();

      const mongodbSettings: MongoDBConfig = {
        client: 'mongo',
        host: `127.0.0.1`,
        database: 'strapi_test',
        port: mongod.instanceInfo?.port || 27017
      };

      instance = Strapi({});

      instance.config.set(
        'database.connections.default.settings',
        mongodbSettings
      );

      try {
        await instance.load();
      } catch (error) {
        instance.log.error(error.message);
      }

      // extend the rate limit
      // https://github.dev/strapi/strapi/blob/master/packages/strapi-plugin-users-permissions/config/policies/rateLimit.js
      instance.plugins['users-permissions'].config.ratelimit.max = 10000;

      instance.app
        .use(instance.router.routes()) // populate KOA routesa
        .use(instance.router.allowedMethods()); // populate KOA methods

      instance.server = http.createServer(instance.app.callback());
    }

    this.global.strapi = instance;
    this.global.request = supertest(instance.server);
    this.global.api = createTestApi(this.global.request);
  }

  async teardown() {
    total -= 1;

    const _teardown = async () => {
      if (instance) {
        await instance.destroy();
        instance = null;
      }
      await mongod.stop();
      await super.teardown();
    };

    if (total === 0) {
      return _teardown();
    }

    if (instance) {
      /**
       * This fixes the NodeJS `MaxListenersExceededWarning` when your e2e test becomes more. Cause by `strapi-utils/lib/logger`
       * https://github.com/strapi/strapi/blob/1fe4b5ecad162e487fa7dd26a9422569915b4d9c/packages/strapi-utils/lib/logger.js#L56
       *
       * Or the jest option "--runInBand" (alias to "-i")
       * https://www.petecorey.com/blog/2018/11/05/bending-jest-to-our-will-caching-modules-across-tests/
       *
       * And the solution found from
       * https://github.com/pinojs/pino/issues/144#issuecomment-356887939
       *
       * Be careful the pino version used by Strapi is v4.7.1 which is outdated.
       */
      instance.log.stream.unpipe(process.stdout);
    }

    timeout = setTimeout(_teardown, 10 * 1000);
  }
}
