/* eslint-disable no-undef */
const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('./tsconfig');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper:
    pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
};
