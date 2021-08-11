import Joi, { Extension, CustomHelpers } from 'joi';
import File from 'formidable/lib/file';

export interface FileOption {
  max?: number;
  types?: string[];
}

export const mb = 1024 * 1024;

function validateExtention(
  value: File,
  helpers: CustomHelpers,
  { extnames }: { extnames: string[] }
) {
  if (!value.type) {
    return helpers.error('file.noExt');
  }

  const fileType = value.type.split('/').slice(-1)[0].toLowerCase();

  if (!extnames.includes(fileType)) {
    return helpers.error('file.invalidExt', {
      extnames: extnames.join(' / ')
    });
  }

  return value;
}

export const file = (joi: typeof Joi): Extension => {
  return {
    type: 'file',
    base: joi.any(),
    messages: {
      'file.isNotFile': '{{#label}} should be a file',
      'file.max': '{{#label}} should not larger then {{#max}}MB',
      'file.noExt': '{{#label}} file type not found',
      'file.invalidExt': '{{#label}} extention should be one of {{#extnames}}'
    },

    validate(value: unknown, helpers: CustomHelpers) {
      if (!(value instanceof File)) {
        return { value, errors: helpers.error('file.isNotFile') };
      }
    },

    rules: {
      max: {
        method(size) {
          return this.$_addRule({ name: 'max', args: { size } });
        },
        args: [
          {
            name: 'size',
            ref: true,
            assert: value => typeof value === 'number' && !isNaN(value),
            message: 'must be a number'
          }
        ],
        validate(
          value: File,
          helpers: CustomHelpers,
          { size }: { size: number }
        ) {
          if (size && value.size > size * mb) {
            return helpers.error('file.max', { max: size });
          }
          return value;
        }
      },
      ext: {
        method(extnames: string[]) {
          return this.$_addRule({ name: 'ext', args: { extnames } });
        },
        args: [
          {
            name: 'extnames',
            ref: true,
            assert: value => Array.isArray(value) && !!value.length,
            message: 'must be an array and not empty'
          }
        ],
        validate: validateExtention
      },
      image: {
        method() {
          return this.$_addRule('image');
        },
        validate(value: File, helpers: CustomHelpers) {
          return validateExtention(value, helpers, {
            extnames: ['png', 'jpg', 'jpeg']
          });
        }
      }
    }
  };
};
