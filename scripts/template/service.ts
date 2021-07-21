// @ts-expect-error
import { __IEntity } from '@/typings';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services)
 * to customize this service
 */

// @ts-ignore: ignore
declare module 'strapi' {
  export interface Services {
    // @ts-expect-error
    __apiName: __ServiceTypeService<__IEntity> & typeof __apiNameService;
  }
}

const __apiNameService = {};

module.exports = __apiNameService;
