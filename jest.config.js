
module.exports = {
  preset: 'ts-jest',
  coverageDirectory: "coverage",
  "collectCoverage": false,
  "coverageReporters": [
    "lcov",
    "html",
    "json",
  ],
  testEnvironment: "./prisma/prisma-test-environment.js",
  moduleDirectories: ["node_modules", "<rootDir>"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"]
};