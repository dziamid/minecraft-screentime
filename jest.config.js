module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  modulePathIgnorePatterns: ['/node_modules/'],
  globalSetup: './global-setup.js',
  testRegex: 'spec.ts'
};
