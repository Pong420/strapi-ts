/* eslint-disable @typescript-eslint/ban-types */

// eslint-disable-next-line
import * as strapi from 'strapi';
import { File } from 'formidable';

type Files = Record<string, File | File[]>;

declare module 'strapi' {
  // https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services

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
    find(params?: any, populate?: string[]): Promise<Data>;
    createOrUpdate(data: any, { files }?: { files?: IFile[] }): Promise<Data>;
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
