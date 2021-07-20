module.exports = ({ env }: { env: StrapiEnv }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      // just a default value, the actual config are defined at `tests/helpers/strapi.js`
      settings: {
        client: 'mongo',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'strapi_test'),
        username: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD')
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE'),
        ssl: env('DATABASE_SSL')
      }
    }
  }
});
