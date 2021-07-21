import { Controller, Get, resolveController } from '@/decorators/http';
import { CollectionTypeController } from 'strapi';

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
