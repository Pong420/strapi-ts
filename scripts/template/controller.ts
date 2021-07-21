// @ts-expect-error
import { __ServiceTypeController } from 'strapi';
// @ts-expect-error
import { Controller, resolveController } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    __apiName: __ApiNameController;
  }
}

@Controller('/__collectionName')
// @ts-expect-error
class __ApiNameController extends __ServiceTypeController {}

module.exports = resolveController(new __ApiNameController());
