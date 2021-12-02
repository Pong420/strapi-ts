module.exports = ({ env }: { env: StrapiEnv }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      // just a default value, the actual config are defined at `tests/helpers/strapi.js`
      settings: {
        client: 'mongo',
        uri: env('DATABASE_URI', 'mongodb://localhost:27017/strapi'),
        srv: env.bool('DATABASE_SRV', true)
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE'),
        ssl: env.bool('DATABASE_SSL', false)
      }
    }
  }
});
