module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'off',
    'arrow-parens': ['error', 'always'],
  },
}
