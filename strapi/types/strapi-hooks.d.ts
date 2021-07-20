// eslint-disable-next-line
import * as strapi from 'strapi';

declare module 'strapi' {
  // Model Lifecycle Hooks
  // make sure not to reassign the payload/query
  // https:strapi.io/documentation/developer-docs/latest/development/backend-customization.html#models
  export interface Hooks<T> {
    beforeFind?: (
      params: Record<string, string>,
      populate: string[]
    ) => void | Promise<void>;
    afterFind?: (
      result: T[],
      params: Record<string, string>,
      populate: string[]
    ) => void | Promise<void>;

    beforeFindOne?: (
      params: Record<string, string>,
      populate: string[]
    ) => void | Promise<void>;
    afterFindOne?: (
      result: T,
      params: Record<string, string>,
      populate: string[]
    ) => void | Promise<void>;

    beforeCreate?: <P = Partial<T>>(payload: P) => void | Promise<void>;
    afterCreate?: (payload: T) => void | Promise<void>;

    beforeUpdate?: <P = Partial<T>>(
      query: Partial<T>,
      payload: P
    ) => void | Promise<void>;
    afterUpdate?: <P = Partial<T>>(
      result: T,
      query: Partial<T>,
      payload: P
    ) => void | Promise<void>;

    beforeDelete?: <P = Partial<T>>(query: P) => void | Promise<void>;
    afterDelete?: (result: T, query: Partial<T>) => void | Promise<void>;

    beforeCount?: <P = Partial<T>>(query: P) => void | Promise<void>;
    afterCount?: (result: number, query: Partial<T>) => void | Promise<void>;

    beforeSearch?: (params: Search, populate: string[]) => void | Promise<void>;
    afterSearch?: (
      results: T[],
      params: Record<string, string>,
      populate: string[]
    ) => void | Promise<void>;

    beforeCountSearch?: (query: Search) => void | Promise<void>;
    afterCountSearch?: (
      result: number,
      query: Partial<T>
    ) => void | Promise<void>;
  }
}
