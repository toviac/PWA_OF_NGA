module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': [
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
      { allowForLoopAfterthoughts: true },
    ],
    'arrow-parens': [
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'as-needed',
    ],
    'max-len': ['warn', 200],
    'linebreak-style': ["off", "windows"]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
