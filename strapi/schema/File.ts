import Joi, { AnySchema } from '@/schema/joi';
import { IFile } from '@/typings';

export const File: Record<keyof IFile, AnySchema> = {
  id: Joi.mongoId(),
  name: Joi.string(),
  ext: Joi.string().allow('').optional(),
  hash: Joi.string(),
  mime: Joi.string(),
  url: Joi.string(),
  provider: Joi.string(),
  related: Joi.array(),
  size: Joi.number(),
  width: Joi.number().allow(null),
  height: Joi.number().allow(null),
  formats: Joi.object().optional(),
  alternativeText: Joi.string().allow('').optional(),
  caption: Joi.string().allow('').optional(),
  previewUrl: Joi.string().allow('').optional(),
  provider_metadata: Joi.object().optional(),
  createdAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate()
};
export const FileSchema = Joi.object<IFile>(File);

export function isFile(payload: unknown): payload is IFile {
  const result = FileSchema.validate(payload);
  return !result.error;
}
