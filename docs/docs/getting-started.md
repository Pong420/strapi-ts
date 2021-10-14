---
title: Getting Started
slug: /
---

If you are new to Strapi. I will suggest you start from [offical strapi documentation](https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html)

If you want to start from this project. You should have a local `mongodb` server or `docker` installed. Otherwise you will need to edit the database configuration in `strapi/config/database.ts`.

### Development

For first time to clone the project run

```bash
yarn install
yarn build
```

then, to start development

```
yarn dev
```

### Docker

- start development using docker

  ```bash
  docker compose up
  docker compose up docs # only start documentation
  ```

  If dependencies in `package.json` changed

  ```bash
  docker compose up --build -V dev # only rebuild strapi instance
  docker compose up --build -V # rebuild all container
  ```

  flag `-V` recreate **anonymous** volumes instead of retrieving data from the previous containers. So you may need to prune the unused volumes after rebuild

  ```bash
  docker volume prune
  ```

- Build the docker image for production
  ```bash
  yarn docker build
  ```
- Run the docker image with a shell script. You could edit/check the file for debugging
  ```bash
  yarn docker sh
  ```
- Start the docker image
  ```bash
  yarn docker run # ...args
  yarn docker run --env-file ./strapi/.env
  ```

## Reference

- [Docker Setup](https://blog.logrocket.com/containerized-development-nestjs-docker/)
