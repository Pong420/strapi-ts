import { CollectionTypeController } from 'strapi';
import { Controller, classToObject, Get } from '@/decorators/http';

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

module.exports = classToObject(new CategoryController());
