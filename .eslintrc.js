/* eslint-disable */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "prettier"
  ],
  settings: {
    react: {
      version: 'detect',
    }
  },
  rules: {
    // "prettier/prettier": 2,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "no-unused-vars": 0,
    "semi": 2,
    "eqeqeq": 1,
    "curly": 1,
    "react/prop-types": 0,
  },
  ignorePatterns: [
    "node_modules",
    "config",
    "**/*.config.*",
    "**/*.setup.*",
  ],
};