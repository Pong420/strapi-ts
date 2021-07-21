// eslint-disable-next-line
import * as strapi from 'strapi';

declare module 'strapi' {
  // the typeof model depends on SQL/Mongo database
  export class CollectionTypeController {
    find(ctx: KoaContext): Promise<unknown>;
    findOne(ctx: KoaContext): Promise<unknown>;
    count(ctx: KoaContext): Promise<unknown>;
    create(ctx: KoaContext): Promise<unknown>;
    update(ctx: KoaContext): Promise<unknown>;
    delete(ctx: KoaContext): Promise<unknown>;
  }

  export class SingleTypeController {
    find(ctx: KoaContext): Promise<unknown>;
    update(ctx: KoaContext): Promise<unknown>;
    delete(ctx: KoaContext): Promise<unknown>;
  }

  export interface Controllers {
    [x: string]: any;
  }

  interface Strapi {
    controllers: Controllers;
  }
}
