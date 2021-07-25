declare module 'strapi-utils' {
  type File = import('formidable').File;

  export interface SanitizeEntityOption {
    model: any;
  }

  function sanitizeEntity<T = any>(
    payload: any,
    options: SanitizeEntityOption
  ): T;

  function parseMultipartData<T = any>(
    ctx: KoaContext
  ): { data: T; files: Record<string, File | File[]> };

  export { sanitizeEntity, parseMultipartData };
}
