module.exports = ({ env }: { env: StrapiEnv }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f7a924e6c65ee1e93ac84303c40c107a')
    }
  }
});
