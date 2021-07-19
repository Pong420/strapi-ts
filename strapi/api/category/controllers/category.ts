import { resolveController, Controller, Get } from '@/decorators/routes';

@Controller()
class CategoryController {
  @Get('/')
  async find(ctx: any) {
    console.log('findOne', 'find');
    return [];
  }
}

module.exports = resolveController(new CategoryController());
