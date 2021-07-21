import { ICategory } from '@/typings';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services)
 * to customize this service
 */

declare module 'strapi' {
  export interface Services {
    category: CollectionTypeService<ICategory> & typeof categoryService;
  }
}

const categoryService = {};

module.exports = categoryService;
