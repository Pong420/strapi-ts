## Strapi Typescript

> template for strapi and typescript

[Documentation](https://pong420.github.io/strapi-ts/)

### Features

- Strongly typed - I have defined a lot of strapi api and koa types
- Http decorators - replace the configuration of `routes.json`
  ```ts
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
- Path alias - Only `@/` is supported. You could edit `resolvePathAlias.ts` for other path alias
  ```ts
  import { IProduct } from '@/typings';
  import { Policies } from '@/decorators/http';
  ```
- Unit / E2e test ready
- Schema (optional) - defines how the data will be sent over the network
- eslint / ling-staged / husky setup
- Docker setup
