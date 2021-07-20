import { resolveController, Controller } from '@/decorators/controller';
import { Get } from '@/decorators/routes';

@Controller('categories')
class CategoryController {
  @Get('/')
  async find() {
    return [];
  }
}

module.exports = resolveController(new CategoryController());
