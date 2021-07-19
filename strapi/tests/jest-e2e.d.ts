import supertest from 'supertest';

declare global {
  let request: supertest.SuperTest<supertest.Test>;

  namespace NodeJS {
    interface Global {
      request: supertest.SuperTest<supertest.Test>;
    }
  }
}
