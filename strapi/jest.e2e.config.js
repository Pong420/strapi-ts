// @ts-check
const defaultConfig = require('./jest.config');

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ...defaultConfig,
  displayName: 'e2e',
  testSequencer: './tests/helpers/testSequencer.js',
  testEnvironment: './tests/helpers/strapiEnvironment.js',
  testRegex: '.e2e-spec.js$'
};

module.exports = config;
