import type { ObjectSchema, ValidationResult, ValidationOptions } from 'joi';
import { parseMultipartData } from 'strapi-utils';

export function createSchemaPolicy(
  schema: ObjectSchema,
  type: 'body' | 'query',
  options?: ValidationOptions
) {
  async function policy(ctx: KoaContext, next: KoaNext) {
    let result: ValidationResult;

    if (ctx.is('multipart')) {
      // TODO: pass files into body
      const { data } = parseMultipartData(ctx);
      result = schema.validate(data, options);
    } else {
      result = schema.validate(ctx.request[type], options);
    }

    if (result.error) {
      return ctx.badRequest(result.error.details[0].message);
    }

    if (!options || options.convert !== false) {
      Object.assign(ctx.request[type], result.value);
    }

    await next();
  }

  return policy;
}
