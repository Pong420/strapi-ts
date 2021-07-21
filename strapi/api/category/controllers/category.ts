import { CollectionTypeController } from 'strapi';
import { Controller, Get, resolveController } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    category: CategoryController;
  }
}

@Controller('/categories')
class CategoryController extends CollectionTypeController {
  @Get('/')
  async find() {
    return [];
  }
}

module.exports = resolveController(new CategoryController());
