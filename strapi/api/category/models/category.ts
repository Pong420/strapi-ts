import { Lifecycles } from 'strapi';
import { ICategory } from '@/typings';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#models)
 * to customize this model
 */

declare module 'strapi' {
  interface Strapi {
    query(modelName: 'category'): Query<ICategory>;
  }
}

const CategoryLifecycle: Lifecycles<ICategory> = {};

module.exports = CategoryLifecycle;
