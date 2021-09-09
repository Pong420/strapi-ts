import _ from 'lodash';
import File from 'formidable/lib/file';
import type {
  ObjectSchema,
  AlternativesSchema,
  ValidationOptions,
  ValidationResult
} from 'joi';

interface CreatePolicyOptions extends ValidationOptions {
  // merge customizer, anims for schema contain array of file
  merge?: (objValue: any, srcValue: any) => any;
}

export const mergeWith = (...object: [any, any, any?, any?, any?]) => {
  return _.mergeWith(...object, (objValue, srcValue) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });
};

export function createSchemaPolicy(
  schema: ObjectSchema | AlternativesSchema,
  type: 'body' | 'query',
  { merge = mergeWith, ...options }: CreatePolicyOptions = {}
) {
  async function policy(ctx: KoaContext<any>, next: KoaNext) {
    let result: ValidationResult;
    const files = _.mapKeys(ctx.request.files, (_, key) =>
      // strapi suggested to prefix all files with `files`. For example,`files.cover`
      key.replace(/^files\./, '')
    );

    if (ctx.is('multipart')) {
      let data: unknown;

      try {
        const raw = ctx.request.body.data || '{}';
        data = JSON.parse(raw);
      } catch (error) {
        return ctx.badRequest(
          `Invalid 'data' field. 'data' should be a valid JSON.`
        );
      }

      result = schema.validate(
        // merge for schema contains array of files
        merge(data, files),
        options
      );

      // Extract the files
      // Since the value could be converted, should not use `result.value = JSON.parse(raw);`
      for (const key in files) {
        const { [key]: file, ...rest } = result.value;
        result.value = rest;

        if (Array.isArray(file)) {
          const [_file, payload] = _.partition(file, f => f instanceof File);
          if (payload.length) {
            result.value[key] = payload;
          }
          files[key] = _file;
        } else {
          files[key] = file;
        }
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
