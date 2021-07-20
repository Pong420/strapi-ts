import { Controller, Get, resolveController } from '@/decorators/http';

@Controller('/categories')
class CategoryController {
  @Get('/')
  async find() {
    return [];
  }
}

module.exports = resolveController(new CategoryController());
