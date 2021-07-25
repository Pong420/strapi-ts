import type { ObjectSchema, ValidationOptions } from 'joi';
import { parseMultipartData } from 'strapi-utils';

export function createSchemaPolicy(
  schema: ObjectSchema,
  type: 'body' | 'query',
  options?: ValidationOptions
) {
  async function policy(ctx: KoaContext, next: KoaNext) {
    let data: unknown = {};
    let files: Record<string, unknown> = {};

    if (ctx.is('multipart')) {
      ({ data, files } = parseMultipartData(ctx));
    } else {
      data = ctx.request[type];
    }

    const result = schema.validate(data, options);
    if (result.error) {
      return ctx.badRequest(result.error.details[0].message);
    }

    if (!options || options.convert !== false) {
      Object.assign(ctx.request, { files, [type]: result.value });
    }

    await next();
  }

  return policy;
}
