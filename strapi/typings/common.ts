/* eslint-disable @typescript-eslint/ban-types */

// https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#model-options
export interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

export interface IFile extends Timestamp {
  id: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: { [key: string]: any };
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: { [key: string]: any };
  related: any[];
}

// https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters
export type IFilterOperator =
  | 'eq'
  | 'ne'
  | 'lt'
  | 'gt'
  | 'lte'
  | 'gte'
  | 'in'
  | 'nin'
  | 'contains'
  | 'ncontains'
  | 'containss'
  | 'ncontainss'
  | 'null';

export type IFilterPath<K extends string> = K | `${K}_${IFilterOperator}`;
export type IFileterPaths<T, K extends keyof T = keyof T> =
  | IFilterPath<Extract<K, string>>
  | (K extends string
      ? T[K] extends object
        ? `${K}.${Extract<keyof T[K], string>}`
        : never
      : never);

export type IFilter<T> = {
  [K in IFileterPaths<T>]?: any;
};

export type ISort<T> = keyof T extends string
  ? `${keyof T}:${'asc' | 'desc'}`
  : never;

export type IWhere<T> = IFilter<T>[] | { _or: (IFilter<T> | IFilter<T>[])[] };

export type IQueryParam<T> = IFilter<T> & {
  _where?: IWhere<T>;
  _sort?: string;
  _limit?: number;
  _start?: number;
};
