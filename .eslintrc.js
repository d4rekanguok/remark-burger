module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
  }
}