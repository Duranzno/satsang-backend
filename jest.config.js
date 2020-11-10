
module.exports = {
  preset: 'ts-jest',
  coverageDirectory: "coverage",
  "collectCoverage": false,
  "coverageReporters": [
    "lcov",
    "html",
    "json",
  ],
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/", "<rootDir>/src/__tests__/utils/"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "./prisma/prisma-test-environment.js",
  moduleDirectories: ["node_modules", "<rootDir>"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"]
};