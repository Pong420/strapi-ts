---
title: Notes
---

### Why `/docs` is not a yarn workspace

1. docusaurus do not work with yarn workspace. The solutions mentioned in this [issue](https://github.com/facebook/docusaurus/issues/3515) does not work for me
2. The version of React that use in strapi is fixed to ~16. We need to downgrade the React version to solve the limitation of [multiple instances of React](https://github.com/facebook/react/issues/13991)
