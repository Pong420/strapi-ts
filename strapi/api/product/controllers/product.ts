import { CollectionTypeController } from 'strapi';
import { Controller, resolveController } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    product: ProductController;
  }
}

interface ProductController extends CollectionTypeController {}

@Controller('/products')
class ProductController {}

module.exports = resolveController(new ProductController());
