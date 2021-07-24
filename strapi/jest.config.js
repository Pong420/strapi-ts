// @ts-check

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testRunner: 'jest-circus/runner',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['./tests/matchers/index.js'],
  testPathIgnorePatterns: ['/node_modules/', '.cache']
};

module.exports = config;
