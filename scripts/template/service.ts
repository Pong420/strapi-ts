// @ts-expect-error
import { __ApiKindService } from 'strapi';
// @ts-expect-error
import { __IEntity } from '@/typings';
// @ts-expect-error
import { classToObject } from '@/utils/classToObject';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services)
 * to customize this service
 */

// @ts-ignore: ignore
declare module 'strapi' {
  export interface Services {
    // prettier-ignore
    "__apiName": __ApiNameService;
  }
}

interface __ApiNameService extends __ApiKindService<__IEntity> {}

class __ApiNameService {}

module.exports = classToObject(new __ApiNameService());
