// @ts-expect-error
import { __ApiKindController } from 'strapi';
// @ts-expect-error
import { Controller, classToObject } from '@/decorators/http';

declare module 'strapi' {
  export interface Controllers {
    // prettier-ignore
    "__apiName": __ApiNameController;
  }
}

interface __ApiNameController extends __ApiKindController {}

@Controller('/__collectionName')
// @ts-expect-error
class __ApiNameController {}

module.exports = classToObject(new __ApiNameController());
