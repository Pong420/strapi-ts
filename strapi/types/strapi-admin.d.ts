// eslint-disable-next-line
import * as strapi from 'strapi';

declare module 'strapi' {
  export interface StrapiAdmin {
    services: StrapiAdminServices;
  }

  export interface StrapiAdminServices {
    [key: string]: any;
    token: StrapiAdminTokenServices;
  }

  export interface StrapiAdminTokenServices {
    decodeJwtToken(token: string): Promise<{ isValid: boolean; payload: any }>;
    [key: string]: any;
  }

  interface Strapi {
    admin: StrapiAdmin;
  }
}
