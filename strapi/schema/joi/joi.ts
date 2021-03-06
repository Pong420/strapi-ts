import Joi from 'joi';
import { mongoId } from './mongoId';
import { file } from './file';
import { enumSchema } from './enum';

interface StringSchema extends Joi.StringSchema {
  phoneNumber(): this;
  wordsCount(limit: number, maxWordLength?: number): this;
}

interface FileSchema extends Joi.AnySchema {
  maxSize(size: number): this;
  extension(extnames: string[]): this;
  image(): this;
}

export interface Root extends Joi.Root {
  string(): StringSchema;
  file(): FileSchema;
  mongoId(): AnySchema;
  enum(payload: Record<string, Record<string, unknown>>): AnySchema;
}

export interface AnySchema extends Joi.AnySchema {}

const isStringSchema = (schema: Joi.Schema): schema is Joi.StringSchema =>
  schema.type === 'string';

let JoiExtend = Joi.extend(mongoId, file);

Object.assign(JoiExtend, { enum: enumSchema });

JoiExtend = JoiExtend.defaults((schema: AnySchema) => {
  if (isStringSchema(schema)) {
    schema = schema.trim();
  }
  return schema.options({ presence: 'required' });
});

export default JoiExtend as Root;
