/* eslint-disable @typescript-eslint/ban-types */

// eslint-disable-next-line
import * as strapi from 'strapi';
import { File } from 'formidable';

type Files = Record<string, File | File[]>;

declare module 'strapi' {
  // https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services

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

  export interface CollectionTypeService<Data> {
    find(params: any, populate?: Populate<Data>[]): Promise<Data[]>;
    findOne(params: any, populate?: Populate<Data>[]): Promise<Data>;
    count(params: any): Promise<number>;
    create(data: any, { files }?: { files: Files }): Promise<Data>;
    update(params: any, data: any, { files }?: { files: Files }): Promise<Data>;
    delete(params: any): Promise<unknown>;
    search(params: any): Promise<Data[]>;
    countSearch(params: any): Promise<number>;
  }

  export interface SingleTypeService<Data> {
    find(populate: string[]): Promise<Data>;
    createOrUpdate(data: any, { files }: { files?: IFile[] }): Promise<Data>;
    delete(): Promise<unknown>;
  }

  export interface Services {
    [x: string]: any;
  }

  interface Strapi {
    services: Services;
    entityService: any;
  }
}
