import * as supertest from 'supertest';
import { Tests } from './helpers/api';

declare global {
  let request: supertest.SuperTest<supertest.Test>;
  let api: Tests;

  namespace NodeJS {
    interface Global {
      request: supertest.SuperTest<supertest.Test>;
      api: Tests;
    }
  }
}

declare module 'supertest' {
  export class Test {
    token(token?: string): this;
    multipart(): this;
  }
}
