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
  ```

### E2E tests

- In this project, e2e test expected to be a test with database/network connection. Test `api`
- The e2e test file should suffix with `.e2e-spec`
- The jest config file is `jest.e2e.config.js`
- testing command

  ```bash
  # run all e2e test
  yarn test:e2e
  ```

### Strapi Environment

- Setup strapi and database automatically during each test. You do not need to set up and shut down strapi in each test file using `beforeAll` and `afterAll`.
- But be careful, the strapi instance and database are reuse in each test.
- See `strapi/tests/helpers/strapiEnvironment.ts`

### Test Api

- I have created an API utility/instance for the e2e testing. You do not need the care about the HTTP method and the path.
- The API instance is strongly typed and depends on `strapi/tests/helpers/routes.ts` which is a file auto-generated by `esbuild/routeMetadata.ts`. If you found the content is not up to date run `yarn build`
- Examples:

  ```ts
  // basic usage
  api.category.find().send();
  // dynamic path '/categories/:id'
  api.category.findOne({ id: 'mongoid' }).send();
  // add bearer token
  api.profile.get.token(token).send();
  // multipart, upload file
  api.product
    .create()
    .multipart()
    .attach('file', './image.png')
    .field({ data: 'data' });
  ```

  The above code same as below

  ```ts
  request.get('/categories').send();
  request.get(`/categories/${mongoid}`).send();
  request.get(`/profile`).set('Authorization', `bearer ${token}`).send();
  request
    .post(`/products`)
    .set('Content-Type', 'multipart/form-data')
    .attach('file', './image.png')
    .field({ data: 'data' });
  ```

### Create custom jset matcher

1. Refer to the matchers in `tests/matchers`
2. Remember to extend and export the matcher function

```js
expect.extend({ theMatchFunction });
module.exports = { theMatchFunction };
```

3. Export the matcher file in `tests/matchers/index.js`

### Define a new global variables for test

1. Define the type of variables in `tests/jest-e2e.d.ts`
2. Set the initial values in `/jest-setup.js`
3. Update the `globals` field in `.eslintrc`

### Watch / Specific a test