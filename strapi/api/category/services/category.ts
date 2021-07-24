import { CollectionTypeService } from 'strapi';
import { ICategory } from '@/typings';
import { classToObject } from '@/utils/classToObject';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services)
 * to customize this service
 */

declare module 'strapi' {
  export interface Services {
    category: CategoryService;
  }
}

interface CategoryService extends CollectionTypeService<ICategory> {}

class CategoryService {}

module.exports = classToObject(new CategoryService());
