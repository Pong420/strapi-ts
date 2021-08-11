import Joi from 'joi';
import { mongoId } from './mongoId';
import { file } from './file';

interface StringSchema extends Joi.StringSchema {
  mongoId(): this;
  phoneNumber(): this;
  wordsCount(limit: number, maxWordLength?: number): this;
}

interface FileSchema extends Joi.AnySchema {
  max(size: number): this;
  ext(extnames: string[]): this;
  image(): this;
}

export interface Root extends Joi.Root {
  string(): StringSchema;
  file(): FileSchema;
}

export interface AnySchema extends Joi.AnySchema {}

const isStringSchema = (schema: Joi.Schema): schema is Joi.StringSchema =>
  schema.type === 'string';

let JoiExtend = Joi.extend(mongoId, file);

JoiExtend = JoiExtend.defaults((schema: AnySchema) => {
  if (isStringSchema(schema)) {
    schema = schema.trim();
  }
  return schema.options({ presence: 'required' });
});

export default JoiExtend as Root;
