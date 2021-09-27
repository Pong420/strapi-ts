/* eslint-disable @typescript-eslint/ban-types */

// eslint-disable-next-line
import * as strapi from 'strapi';
import { IQueryParam } from '@/typings';

declare module 'strapi' {
  export type Search<T> = IQueryParam<T> & {
    _q?: string;
  };

  // assume only object could be poplulate
  type PopulatePath<T> = NonNullable<AllowedNames<T, object>>;

  export type NestedPopulatePaths<
    T extends object,
    K extends keyof T
  > = T[K] extends object
    ? `${Extract<K, string>}.${Extract<PopulatePath<T[K]>, string>}`
    : never;

  export type MongosePopulate<T extends object, K extends keyof T> = {
    path: K;
    populate?: T[K] extends object
      ? MongosePopulate<T[K], PopulatePath<T[K]>>
      : never;
  };

  export type Populate<T, K extends keyof T = PopulatePath<T>> =
    | K
    | NestedPopulatePaths<T, K>
    | MongosePopulate<T, K>;

  // The response is not confirmed
  // https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#api-reference
  interface Query<
    DataSchema,
    ReadBase = Partial<DataSchema>,
    Create = DataSchema,
    Update = Partial<DataSchema>,
    Delete = Partial<Read>,
    Data = Model<DataSchema>,
    Read = Partial<ReadBase> & Search<ReadBase> & { id?: string }
  > {
    find(query?: Read, populate?: Populate<DataSchema>[]): Promise<Data[]>;
    findOne(query: Read, populate?: Populate<DataSchema>[]): Promise<Data>;
    create(payload: Omit<Create, 'id'>): Promise<Data>;
    update(query: Read, payload: Update): Promise<Data>;
    delete(payload: Delete): Promise<unknown>;
    count(query?: Partial<Data>): Promise<number>;
    search(search: Read): Promise<Data[]>;
    countSearch(search: Read): Promise<number>;
    model: Model<Data>;
  }

  interface Strapi {
    query<T>(model: string, pluginName?: string): Query<T>;
  }
}
