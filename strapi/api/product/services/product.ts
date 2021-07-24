import { CollectionTypeService } from 'strapi';
import { IProduct } from '@/typings';
import { classToObject } from '@/utils/classToObject';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services)
 * to customize this service
 */

declare module 'strapi' {
  export interface Services {
    product: ProductService;
  }
}

interface ProductService extends CollectionTypeService<IProduct> {}

class ProductService {}

module.exports = classToObject(new ProductService());
