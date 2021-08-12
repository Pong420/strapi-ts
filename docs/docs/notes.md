---
title: Notes
---

- Do not remove the `prefix` field in the `strapi/extensions/users-permissions/config/routes.json` event if its value is empty. Because the controller will suspend and you cannot found any useful debug information

- Some of the `/auth/*` routes have a rate-limit policy. These routes config is defined [here](https://github.com/strapi/strapi/blob/master/packages/strapi-plugin-users-permissions/config/routes.json) and here is the [rate limit config](https://github.com/strapi/strapi/blob/master/packages/strapi-plugin-users-permissions/config/request.json).

- Backup the database before create/update a model schema in `Strapi Admin Panel`. Especially remove a relation field between collection.

- If you have assign the policy `plugins::users-permissions.isAuthenticated`. The value of `ctx.state.user` is up to date and do not need to query again
  ```js
  strapi.query('user', 'users-permissions').findOne({ id: ctx.state.user.id });
  ```
