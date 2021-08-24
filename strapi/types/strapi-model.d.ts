// eslint-disable-next-line
import * as strapi from 'strapi';
import { Model as MongooseModel } from 'mongoose';

declare module 'strapi' {
  type ModelType<T> = T & MongooseModel<T>;

  // the typeof model depends on SQL/Mongo database
  export type Model<T = any> = ModelType<T> & {
    lifecycles: Lifecycles<T>;
    attributes: Record<string, any>;
    toJSON?: () => T;
  };

  type ModelKeys = IApiNames | 'core_store' | 'strapi_webhooks';

  interface Strapi {
    models: Record<ModelKeys, Model>;
    getModel<T>(model: string, source?: string): Model<T>;
  }
}
