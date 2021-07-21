import { CollectionTypeController } from 'strapi';
import { Controller, resolveController } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    product: ProductController;
  }
}

@Controller('/products')
class ProductController extends CollectionTypeController {}

module.exports = resolveController(new ProductController());
