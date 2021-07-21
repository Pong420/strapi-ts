import { IProduct } from '@/typings';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services)
 * to customize this service
 */

declare module 'strapi' {
  export interface Services {
    product: CollectionTypeService<IProduct> & typeof productService;
  }
}

const productService = {};

module.exports = productService;
