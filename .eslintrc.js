module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
    jest: true,
  },
  extends: ["airbnb-base", "eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-shadow": "off",
  },
};
