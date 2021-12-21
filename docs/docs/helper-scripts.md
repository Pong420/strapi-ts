---
title: Helper Scripts
---

### Strapi

- Scaffold a complete API with its configurations, controller, model and service.

  ```bash
  yarn api <name>

  #  example
  yarn api order
  ```

- new schema template

  ```bash
  yarn schema <name>

  # example
  yarn schema createProduct
  ```

- new schema policy

  ```bash
  yarn policy <name>

  # example
  yarn policy isCreateProduct
  ```

### Mongo

:::caution
Remember to start the mongo container before using these command
:::

Export the database into a `db.dump` file in the root directory.

```bash
node scripts/mongo/dump.js
node scripts/mongo/dump.js database # export with specific name
node scripts/mongo/dump.js --docker # export from docker compose
node scripts/mongo/dump.js --env=uat # export the database that defined in the .env.uat file
```

Console should print the logs of ouput if export success. Also check the file size of `*.dump` is not zero

Import the `*.dump` file at root directory. Similar to export

```bash
node scripts/mongo/restore.js # default import the db.dump file
node scripts/mongo/restore.js database # specific the .dump filename
node scripts/mongo/restore.js --docker # import into docker compose
```
