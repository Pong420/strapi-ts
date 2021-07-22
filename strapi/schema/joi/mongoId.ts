import Joi, { Extension, CustomHelpers } from 'joi';

// https://github.com/validatorjs/validator.js/blob/master/src/lib/isMongoId.js

const hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;

export const mongoId = (joi: typeof Joi): Extension => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.mongoId': '{{#label}} is not a valid mongo object id'
    },
    rules: {
      mongoId: {
        validate(value: string, helpers: CustomHelpers) {
          const isHexadecimal = hexadecimal.test(value);

          if (!isHexadecimal || value.length !== 24) {
            return helpers.error('string.mongoId');
          }

          return value;
        }
      }
    }
  };
};
