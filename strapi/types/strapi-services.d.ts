// eslint-disable-next-line
import * as strapi from 'strapi';

declare module 'strapi' {
  // https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#services

  export interface CollectionTypeService<Data> {
    find(params: any, populate?: (keyof Data)[]): Promise<Data[]>;
    findOne(params: any, populate?: (keyof Data)[]): Promise<Data>;
    count(params: any): Promise<number>;
    create(data: any, { files }: { files?: IFile[] }): Promise<Data>;
    update(
      params: any,
      data: any,
      { files }: { files?: IFile[] }
    ): Promise<Data>;
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
