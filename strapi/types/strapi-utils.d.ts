declare module 'strapi-utils' {
  export interface SanitizeEntityOption {
    model: any;
  }

  function sanitizeEntity<T = any>(
    payload: any,
    options: SanitizeEntityOption
  ): T;

  function parseMultipartData<T = any>(
    ctx: KoaContext
  ): { data: T; files: Record<string, any> };

  export { sanitizeEntity, parseMultipartData };
}
