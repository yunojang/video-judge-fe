const paths = require('./config/paths')

module.exports = {
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
    transform: {
      '^.+\\.(js|jsx)?$': 'babel-jest',
          //es6이상 문법들을 es5문법으로 변경해주는 babel을 사용할 수 있게 함.
      '^.+\\.(ts|tsx)?$': 'ts-jest', 
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: { //webpack의 resolve.alias option과 유사
      '^@/(.*)$': '<rootDir>/$1', //rootPath 변수 밑의 파일을 전체 매핑
      "^src/(.*)$": "<rootDir>/src/$1", //rootPath 변수 밑의 src아래 파일을 전체 매핑
    },
    testMatch: [
      '<rootDir>/**/*.test.(js|jsx|ts|tsx)',
      '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
    ],
    // transformIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    setupFilesAfterEnv: [paths.jestSetup],
  };