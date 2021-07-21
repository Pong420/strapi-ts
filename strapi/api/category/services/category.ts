import { CollectionService } from 'strapi';
import { ICategory } from '@/typings';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
declare module 'strapi' {
  export interface Services {
    category: CollectionService<ICategory> & typeof categoryService;
  }
}

const categoryService = {};

module.exports = categoryService;
