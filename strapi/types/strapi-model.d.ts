// eslint-disable-next-line
import * as strapi from 'strapi';
import { Model as MongooseModel } from 'mongoose';

declare module 'strapi' {
  // the typeof model depends on SQL/Mongo database
  export interface Model<T = any> extends MongooseModel<T> {
    lifecycles: Lifecycles<T>;
    toJSON?: () => T;
  }

  type ModelKeys = IApiNames | 'core_store' | 'strapi_webhooks';

  interface Strapi {
    models: Record<ModelKeys, Model>;
  }
}
