// @ts-expect-error
import { __ApiKindController } from 'strapi';
// @ts-expect-error
import { Controller, resolveController } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    __apiName: __ApiNameController;
  }
}

@Controller('/__collectionName')
// @ts-expect-error
class __ApiNameController extends __ApiKindController {}

module.exports = resolveController(new __ApiNameController());
