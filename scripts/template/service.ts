// @ts-expect-error
import { __ServiceType } from 'strapi';
// @ts-expect-error
import { __IEntity } from '@/typings';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

declare module 'strapi' {
  export interface Services {
    __serviceName: __ServiceType<__IEntity> & typeof __serviceNameService;
  }
}

const __serviceNameService = {};

module.exports = __serviceNameService;
