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
    getModel(model: '__apiName'): Model<__IEntity>;
    // @ts-expect-error
    query(model: '__apiName'): Query<__IEntity>;
  }
}

const __ApiNameLifecycle: { lifecycles?: Lifecycles<__IEntity> } = {};

module.exports = __ApiNameLifecycle;
