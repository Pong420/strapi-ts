// @ts-expect-error
import { Lifecycles } from 'strapi';
// @ts-expect-error
import { __IEntity } from '@/typings';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#models)
 * to customize this model
 */

declare module 'strapi' {
  interface Strapi {
    // @ts-expect-error
    query(modelName: '__apiName'): Query<__IEntity>;
  }
}

const __apiNameLifecycle: Lifecycles<__IEntity> = {};

module.exports = __apiNameLifecycle;
