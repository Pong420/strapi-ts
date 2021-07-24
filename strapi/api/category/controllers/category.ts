import { CollectionTypeController } from 'strapi';
import { Controller, resolveController, Get } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    category: CategoryController;
  }
}

interface CategoryController extends CollectionTypeController {}

@Controller('/categories')
class CategoryController {
  @Get('/')
  async find() {
    return [];
  }
}

module.exports = resolveController(new CategoryController());
