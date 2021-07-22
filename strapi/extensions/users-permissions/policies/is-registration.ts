import { createSchemaPolicy } from '@/schema';
import { RegistrationSchema } from '@/schema/auth/Registration';

module.exports = (ctx: KoaContext, next: KoaNext) => {
  return createSchemaPolicy(RegistrationSchema, 'body')(ctx, next);
};
