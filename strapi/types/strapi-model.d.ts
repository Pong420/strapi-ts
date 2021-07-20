// eslint-disable-next-line
import * as strapi from 'strapi';
import { Model as MongooseModel } from 'mongoose';

declare module 'strapi' {
  // the typeof model depends on SQL/Mongo database
  type Model<T> = MongooseModel<T> & {
    lifecycles: Hooks<T>;
  };

  interface Strapi {
    models: Record<string, Model<any>>;
  }
}
