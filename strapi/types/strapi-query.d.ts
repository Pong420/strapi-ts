// eslint-disable-next-line
import * as strapi from 'strapi';
import { IUser, IRole, IQueryParam } from '@/typings';

declare type Relation<T, K extends keyof T> = Omit<T, K> & { [X in K]: string };

declare module 'strapi' {
  export type Search<T> = IQueryParam<T> & {
    _q?: string;
  };

  // The response is not confirmed
  // https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#api-reference
  interface Query<
    DataSchema,
    ReadBase = Partial<DataSchema>,
    Create = DataSchema,
    Update = Partial<DataSchema>,
    Delete = Partial<Read>,
    Data = DataSchema & { toJSON?: () => DataSchema },
    Read = Partial<ReadBase> & Search<ReadBase> & { id?: string }
  > {
    find(query?: Read, populate?: (keyof DataSchema)[]): Promise<Data[]>;
    findOne(query?: Read, populate?: (keyof DataSchema)[]): Promise<Data>;
    create(payload: Omit<Create, 'id'>): Promise<Data>;
    update(query: Read, payload: Update): Promise<Data>;
    delete(payload: Delete): Promise<unknown>;
    count(query?: Partial<Data>): Promise<number>;
    search(search: Read): Promise<Data[]>;
    countSearch(search: Read): Promise<number>;
    model: Model<Data>;
  }

  interface Strapi {
    query<T>(modelName: string, pluginName?: string): Query<T>;
  }

  interface Strapi {
    query(modelName: 'user', pluginName: 'users-permissions'): Query<IUser>;
    query(modelName: 'role', pluginName: 'users-permissions'): Query<IRole>;
    query(
      modelName: 'permission',
      pluginName: 'users-permissions'
    ): Query<Permission.Internal, Relation<Permission.Internal, 'role'>>;
  }
}
