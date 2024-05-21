module.exports = {
  collectCoverage: true,
  testPathIgnorePatterns: ['./server/routes/dbRoutes.js'],
  collectCoverageFrom: [
      'server/**/*.js',
      '!server/routes/dbRoutes.js',
  ],
  coverageReporters: ["text", "cobertura"],
  projects: [
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
