---
title: Features
---

### Strongly typed

- Strapi api  
  <img src="./screenshot/type-files.png" />

- types for controllers
  <img src="./screenshot/controllers-type.png" />

- types for services
  <img src="./screenshot/services-type.png" />

### Http decorators

```ts {1,3,4}
@Controller('/products')
class ProductController {
  @Post('/')
  @Policies(['plugins::users-permissions.isAuthenticated'])
  async create(ctx: KoaAuthenticatedContext<ICreateProduct>) {
    await strapi
      .query('product')
      .create({ ...ctx.request.body, user: ctx.state.user.id });
    // ...
  }
}
```

The above code will auto-generate a route configuration in `routes.json`. Same config in `routes.json` will be overriden.

```json
{
  "routes": [
    {
      "method": "POST",
      "path": "/products",
      "handler": "product.create",
      "config": {
        "policies": ["plugins::users-permissions.isAuthenticated"]
      }
    }
  ]
}
```

### Path alias

Only `@/` is supported. You could edit `resolvePathAlias.ts` for other path alias

```ts
import { IProduct } from '@/typings';
import { Policies } from '@/decorators/http';
```

### Unit / E2e test

See the [Test](./test.md) section

### Schema

See the [Schema](./schema.md) section

### eslint / ling-staged / husky
