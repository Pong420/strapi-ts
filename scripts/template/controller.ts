// @ts-expect-error
import { __ApiKindController } from 'strapi';
// @ts-expect-error
import { Controller, resolveController } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    __apiName: __ApiNameController;
  }
}

interface __ApiNameController extends __ApiKindController {}

@Controller('/__collectionName')
// @ts-expect-error
class __ApiNameController {}

module.exports = resolveController(new __ApiNameController());
