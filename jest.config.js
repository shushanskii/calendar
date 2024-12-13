/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{
      tsconfig: '<rootDir>/tsconfig.test.json',
      diagnostics: { warnOnly: false }
    }],
  },
};
