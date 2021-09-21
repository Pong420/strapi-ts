import Joi, { Extension, CustomHelpers } from 'joi';
import { ObjectId } from 'mongodb';

// https://github.dev/validatorjs/validator.js/blob/master/src/lib/isMongoId.js

const hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;

export const mongoId = (joi: typeof Joi): Extension => {
  return {
    type: 'mongoId',
    base: joi.any(),
    messages: {
      'any.mongoId': '{{#label}} is not a valid mongo object id'
    },

    validate(value: unknown, helpers: CustomHelpers) {
      if (typeof value === 'string') {
        const isHexadecimal = hexadecimal.test(value);
        if (isHexadecimal && value.length === 24) {
          return;
        }
      } else if (value instanceof ObjectId) {
        return;
      }

      return { value, errors: helpers.error('any.mongoId') };
    }
  };
};
