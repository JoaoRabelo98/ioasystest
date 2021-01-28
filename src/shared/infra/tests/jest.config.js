import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from '../../../../tsconfig.json';

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/src/__tests__/setup.ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
};
