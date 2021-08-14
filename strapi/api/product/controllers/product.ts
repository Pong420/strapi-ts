import { CollectionTypeController } from 'strapi';
import { Controller, classToObject } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    product: ProductController;
  }
}

interface ProductController extends CollectionTypeController {}

@Controller('/products')
class ProductController {}

module.exports = classToObject(new ProductController());
