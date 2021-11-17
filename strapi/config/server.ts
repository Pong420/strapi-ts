module.exports = ({ env }: { env: StrapiEnv }) => {
  const host = env('HOST', '0.0.0.0');
  const port = env.int('PORT', 1337);
  const url = env('SERVER_URL', `http://localhost:${port}`);
  return {
    host,
    port,
    url,
    admin: {
      url: `${url}/admin`,
      auth: {
        secret: env('ADMIN_JWT_SECRET', 'f7a924e6c65ee1e93ac84303c40c107a')
      },
      watchIgnoreFiles: [
        '**/public/**',
        '**/types/**',
        '**/typings/**',
        '**/template/**',
        '**/docs/**',
        '**/tests/**',
        '**/*.test.js',
        'jest.*.js'
      ]
    }
  };
};
