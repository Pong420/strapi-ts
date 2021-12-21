require('./zx');
const _dotenv = require('dotenv');

/**
 * @param {string} key
 */
function env(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
}

const { env: _env = '' } = argv;
let envFile = _env ? `.env.${_env}` : '.env';
envFile = path.join(__dirname, `../strapi/${envFile}`);

try {
  _dotenv.config({ path: envFile });
  // eslint-disable-next-line
  console.log(`load enviroment variables from ${chalk.greenBright(envFile)}`);
} catch (error) {
  console.error(error);
}

module.exports = { env, envFile };
