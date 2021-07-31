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

Export the database into a `db.dump` file in the root directory

```bash
sh scripts/mongo/dump.sh
```

Export with specific name

```bash
sh scripts/mongo/dump.sh database
```

Import the `*.dump` file at root directory. Similar to export

```bash
sh scripts/mongo/restore.sh # default import the db.dump file
sh scripts/mongo/restore.sh database # specific the filename
```
