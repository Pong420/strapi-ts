import { Controller, resolveController } from '@/decorators/http';

@Controller('/products')
class ProductController {}

module.exports = resolveController(new ProductController());
