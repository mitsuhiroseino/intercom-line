/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'cjs', 'mjs'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    // node_modules配下のemsをcjsに変換するために追加
    '^.+\\.m?js$': ['esbuild-jest', { sourcemap: true }],
    // 当プロジェクトのtsをjsに変換するために追加
    '^.+\\.ts$': ['esbuild-jest', { sourcemap: true }],
  },
  // tslibはトランスパイルしない
  transformIgnorePatterns: ['node_modules/(?!(tslib))/'],
};
