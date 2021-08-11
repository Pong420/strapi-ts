import { Lifecycles } from 'strapi';
import { IProduct } from '@/typings';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#models)
 * to customize this model
 */

declare module 'strapi' {
  interface Strapi {
    getModel(model: 'product'): Model<IProduct>;
    query(model: 'product'): Query<IProduct>;
  }
}

const ProductLifecycle: Lifecycles<IProduct> = {};

module.exports = ProductLifecycle;
