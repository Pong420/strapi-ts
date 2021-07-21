// @ts-expect-error
import { Controller, resolveController } from '@/decorators/http';

@Controller('/__collectionName')
// @ts-expect-error
class __ApiNameController {}

module.exports = resolveController(new __ApiNameController());
