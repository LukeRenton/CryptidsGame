module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'server/**/*.js',
    ],
    coverageReporters: ["text", "cobertura"],
    projects: [
      {
        displayName: 'client',
        testEnvironment: 'jsdom',
        testMatch: ['<rootDir>/client/src/**/__tests__/**/*.test.js'],
        transform: {
          '^.+\\.jsx?$': 'babel-jest',
        }
      },
      {
        displayName: 'server',
        testEnvironment: 'node',
        testMatch: ['<rootDir>/server/__tests__/**/*.test.js'],
        transform: {
          '^.+\\.jsx?$': 'babel-jest',
        },
      }
    ],
  };
  