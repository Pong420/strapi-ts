---
title: Project Structure
---

Since Strapi does not has typescript support. So we use [esbuild](https://github.com/evanw/esbuild) to compile ts in js quickly

```bash
.
├── app
├── docs
├── eslint
├── scripts
│   ├── ...
│   └── compile   # scripts/utility for complie typescript
├── strapi
│   ├── ...
│   ├── schema    # joi schema
│   ├── tests     # e2e test
│   ├── types     # types using in development
│   ├── typings   # types expect to share with the client
│   └── ...
└── ...
```

- #### strapi

  The source code of the Strapi project written in typescript

- #### app

  The Strapi runtime scripts that complied from `/strapi`

- #### docs

  This documentation source code

- #### eslint

  local eslint plugin

- #### scripts

  [helper scripts](./helper-scripts)

### Notes

- To run the strapi command easier, we define `/strapi` and `/app` as yarn workspace. But not `/docs`. It is because
  - Docusaurus do not work with yarn workspace. The solutions mentioned in this [issue](https://github.com/facebook/docusaurus/issues/3515) does not work
  - The version of React that use by Strapi is fixed to 16. We need to downgrade the React version to solve the limitation of [multiple instances of React](https://github.com/facebook/react/issues/13991)
