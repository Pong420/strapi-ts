---
title: Schema
---

A schema defines how the data will be sent over the network which similar to **DTO** in `NestJS`. You could use the createSchemaPolicy to create a policy

```ts
import { createSchemaPolicy } from '@/schema';
import { RegistrationSchema } from '@/schema/auth/Registration';

module.exports = createSchemaPolicy(RegistrationSchema, 'body');
```

### Joi

[Joi](https://joi.dev/api/) is used for the schema definition. Be careful there is some preset configuration of Joi

- String will automatically trimed
- `presence` is set to `required`. This means all fields defined in the schema are mark as `required()` expect you add `optional()`

For more details, see `strapi/schema/joi/index.ts`
