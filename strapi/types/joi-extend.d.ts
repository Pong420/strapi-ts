// eslint-disable-next-line
import Joi from 'joi';

declare module 'joi' {
  export interface ObjectSchema<TSchema = any> {
    fork(key: string | string[], adjuster: SchemaFunction): this;
    fork<K extends keyof TSchema>(key: K | K[], adjuster: SchemaFunction): this;
    with<K extends keyof TSchema>(
      key: K,
      peers: K | K[],
      options?: HierarchySeparatorOptions
    ): this;

    _ids: {
      _byKey: Map<string, Schema>;
    };
  }
}
