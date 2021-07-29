declare module 'strapi-utils' {
  type File = import('formidable').File;

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
  ): { data: T; files: Record<string, File | File[]> };

  export { sanitizeEntity, parseMultipartData };
}
