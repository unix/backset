module.exports = {
  verbose: true,

  setupFiles: ['./tests/setup.js'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  testPathIgnorePatterns: ['/pages/', '/dist/', '/lib/', '/.next/'],

  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './tests/.babelrc.js' }],
  },

  testRegex: '.*\\.test\\.(j|t)sx?$',
  // testRegex: '.*update\\.test\\.(j|t)sx?$',

  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],

  moduleNameMapper: {
    'tests/(.*)$': '<rootDir>/tests/$1',
    packages: '<rootDir>/packages/index.ts',
  },
}
