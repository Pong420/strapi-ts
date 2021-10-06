module.exports = ({ env }: { env: StrapiEnv }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
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
