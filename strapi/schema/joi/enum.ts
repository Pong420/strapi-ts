import Joi from 'joi';

const cache = new Map<string, any[]>();

export const enumSchema = function (
  payload: Record<string, Record<string, any>>
) {
  const [[key, _enum]] = Object.entries(payload);
  let values = cache.get(key);
  if (!values) {
    values = Object.values<string | number>(_enum)
      .filter(s => typeof s === 'string')
      .map(s => (typeof _enum[s] === 'undefined' ? s : _enum[s]));
    cache.set(key, values);
  }

  return Joi.valid(...values).messages({
    'any.only': `{{#label}} is not a valid ${key}`
  });
};
