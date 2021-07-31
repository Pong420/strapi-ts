---
title: Project Structure
---

Since Strapi does not has typescript support. So we use [tsup](https://github.com/egoist/tsup) which is command-line tools build on top of [esbuild](https://esbuild.github.io/). It helps to compile ts in js quickly

```bash
.
├── app
├── docs
├── esbuild
├── scripts
├── strapi
│   ├── ...
│   ├── tests     # e2e test
│   ├── types     # types using in development
│   ├── typings   # types expect to share with the client
│   └── ...
└── ...
```

- #### strapi

  The source code of Strapi in typescript

- #### app

  The Strapi runtime scripts that complied from `/strapi`

- #### docs

  This documentation source code

- #### scripts

  [helper scripts](.//helper-scripts)

- #### esbuild
  A list of custom [esbuild](https://esbuild.github.io/) plugin

### Notes

- To execute the strapi instance (javascript) easily, we define `/strapi` and `/app` as yarn workspace. But `/docs` is not a yarn workspace. It is because
  1. docusaurus do not work with yarn workspace. The solutions mentioned in this [issue](https://github.com/facebook/docusaurus/issues/3515) does not work for me
  2. The version of React that use in strapi is fixed to 16. We need to downgrade the React version to solve the limitation of [multiple instances of React](https://github.com/facebook/react/issues/13991)
