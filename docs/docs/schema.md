---
title: Schema
---

A schema defines how the data will be sent over the network which similar to **DTO** in `NestJS`. You could use the `createSchemaPolicy` function to create a strapi policy

```ts
import { createSchemaPolicy } from '@/schema';
import { RegistrationSchema } from '@/schema/auth/Registration';

module.exports = createSchemaPolicy(RegistrationSchema, 'body');
```

### Joi

[Joi](https://joi.dev/api/) is used for the schema definition. Be careful there is some preset configuration

- `Joi.string()` will automatically trimed
- The `presence` option is `required` by default. This means all fields defined in the schema are mark as `required()` unless you add `optional()`. Also fields that not defined in the schema will be consider as invalid

For more details, see `strapi/schema/joi/joi.ts`

### Custom schema

- `Joi.mongoId()` - Valid if the value is a mongoid
- `Joi.file()` - Valid if the value is `File` instance of `formidable`. Also you could validate the file size and extension with `.maxSize(1)` and `extension(['png'])`
- `Joi.enum({ EnumObject })` - Equals to `Joi.valid(...Object.values(EnumObject))`

### Notes

- Be careful when using the `Joi.default()`, If it will share with others. For example
  ```ts
  const create = {
    subscribed: Joi.boolean().default(false)
  };
  const update = {
    subscribed: create.subscribed.optional()
  };
  const result = update.validate({});
  console.log(result.value); // { subscribed: false }
  ```

### Create a schema

See [Helper Scripts](/helper-scripts)
