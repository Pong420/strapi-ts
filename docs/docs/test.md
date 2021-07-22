---
title: Test
---

### Unit tests

- In this project, unit test expected to be a test without database/network connection
- The unit test file should suffix with `.test`
- The jest config file is `jest.config.js`
- testing command

  ```bash
  # run all e2e test
  yarn test

  # enable watch
  yarn test --watch

  # only test specific file
  yarn test schema/joi-extend/mongoId.test.js
  yarn test schema/joi-extend/mongoId.test.js --watch
  ```

### E2E tests

- In this project, e2e test expected to be a test with database/network connection. Test `api`
- The e2e test file should suffix with `.e2e-spec`
- The jest config file is `jest.e2e.config.js`
- testing command

  ```bash
  # run all e2e test
  yarn test:e2e

  # enable watch
  yarn test:e2e --watch

  # only test specific file
  yarn test:e2e tests/category.e2e-spec.js
  yarn test:e2e tests/category.e2e-spec.js --watch

  ```

#### step to new e2e test

### Create custom jset matcher

1. Refer to the matchers in `tests/matchers`
2. Remember to extend and export the matcher function

```js
expect.extend({ theMatchFunction });
module.exports = { theMatchFunction };
```

3. Export the matcher file in `tests/matchers/index.js`

### Define global variables for test

1. Define the type of variables in `tests/test.d.ts`
2. Set the initial values in `/jest-setup.js`
3. Update the `globals` field in `.eslintrc`

### Other

- testSequencer
