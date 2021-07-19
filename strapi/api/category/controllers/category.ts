import { resolveController, Controller } from '@/decorators/controller';
import { Get } from '@/decorators/routes';
import { Query } from '@/decorators/params';

class GetCategories {
  limit: number;
}

@Controller()
class CategoryController {
  @Get('/')
  async find(@Query() query: GetCategories) {
    console.log('find', query);
    return [];
  }
}

module.exports = resolveController(new CategoryController());
