import type { ObjectSchema, ValidationOptions, ValidationResult } from 'joi';
import { mapKeys } from 'lodash';

export function createSchemaPolicy(
  schema: ObjectSchema,
  type: 'body' | 'query',
  options?: ValidationOptions
) {
  async function policy(ctx: KoaContext<any>, next: KoaNext) {
    let result: ValidationResult;
    const files = mapKeys(ctx.request.files, (_, key) =>
      // strapi suggested to prefix all files with `files`. For example,`files.cover`
      key.replace(/^files\./, '')
    );

    if (ctx.is('multipart')) {
      try {
        result = schema.validate(
          { ...JSON.parse(ctx.request.body.data || '{}'), ...files },
          options
        );

        for (const key in files) {
          const { [key]: file, ...rest } = result.value;
          result.value = rest;

          // for futre if the file has transformation
          files[key] = file;
        }
      } catch (error) {
        return ctx.badRequest(
          `Invalid 'data' field. 'data' should be a valid JSON.`
        );
      }
    } else {
      result = schema.validate(ctx.request[type], options);
    }

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
