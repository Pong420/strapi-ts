declare module 'strapi-utils' {
  import formidable = require('formidable');

  export interface SanitizeEntityOption<T> {
    model: any;
    withPrivate?: boolean;
    isOutput?: boolean;
    includeFields?: T[];
  }

  function sanitizeEntity<T = any>(
    payload: any,
    options: SanitizeEntityOption<keyof T>
  ): T;

  function parseMultipartData<T = any>(
    ctx: KoaContext
  ): { data: T; files: Record<string, formidable.File | formidable.File[]> };

  export { sanitizeEntity, parseMultipartData };
}
