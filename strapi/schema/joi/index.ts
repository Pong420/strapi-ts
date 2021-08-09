import Joi from 'joi';
import { mongoId } from './mongoId';

interface StringSchema extends Joi.StringSchema {
  mongoId(): this;
}

export interface Root extends Joi.Root {
  string(): StringSchema;
}

export interface AnySchema extends Joi.AnySchema {}

const isStringSchema = (schema: Joi.Schema): schema is Joi.StringSchema =>
  schema.type === 'string';

let JoiExtend = Joi.extend(mongoId);

JoiExtend = JoiExtend.defaults((schema: AnySchema) => {
  if (isStringSchema(schema)) {
    schema = schema.trim();
  }
  return schema.options({ presence: 'required' });
});

export default JoiExtend as Root;
