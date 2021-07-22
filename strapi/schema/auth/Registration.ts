import Joi, { AnySchema } from '@/schema/joi';
import { IRegistration } from '@/typings';

export const Registration: Record<keyof IRegistration, AnySchema> = {
  username: Joi.string(),
  email: Joi.string()
    .lowercase()
    .email()
    // Strapi will transform email to lower-case before registration but not before login.
    // So the user cannot log in with an upper-case email and may feel confused.
    // Therefore we should set convert to false and throw an error if the email contains upper-case
    .options({ convert: false }),
  password: Joi.string()
};

export const RegistrationSchema = Joi.object<IRegistration>(Registration);

export function isRegistration(payload: unknown): payload is IRegistration {
  const result = RegistrationSchema.validate(payload);
  return !result.error;
}
