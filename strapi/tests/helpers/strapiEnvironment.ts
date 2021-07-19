import http from 'http';
import Strapi from 'strapi';
import supertest from 'supertest';
import NodeEnvironment from 'jest-environment-node';
import { MongoMemoryServer } from 'mongodb-memory-server';

let instance: any = null;

let timeout: NodeJS.Timeout;

const mongod = new MongoMemoryServer();

export default class StrapiEnvironment extends NodeEnvironment {
  async setup() {
    clearTimeout(timeout);

    await super.setup();

    /**
     * Since strapi start time too long, so web should reuse the instance
     */
    if (!instance) {
      await mongod.start();

      const mongodbSettings = {
        client: 'mongo',
        host: `127.0.0.1`,
        database: 'strapi_test',
        port: mongod.instanceInfo?.port || 27017
      };

      instance = Strapi();

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
      // https://github1s.com/strapi/strapi/blob/master/packages/strapi-plugin-users-permissions/config/policies/rateLimit.js
      instance.plugins['users-permissions'].config.ratelimit.max = 10000;

      instance.app
        .use(instance.router.routes()) // populate KOA routesa
        .use(instance.router.allowedMethods()); // populate KOA methods

      instance.server = http.createServer(instance.app.callback());
    }

    this.global.strapi = instance;
    this.global.request = supertest(instance.server);
  }

  async teardown() {
    // timeout = setTimeout(async () => {
    if (instance) {
      await instance.destroy();
      instance = null;
    }
    await mongod.stop();
    await super.teardown();
    // }, 900);
  }

  // /**
  //  * @param {import('jest-circus').Event} event
  //  * @param {import('jest-circus').State} state
  //  */
  // async handleTestEvent(event, state) {}
}
