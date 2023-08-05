module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // ...
    'prettier/prettier': ['error', { singleQuote: true, bracketSpacing: true }],
    quotes: ['error', 'single', 'avoid-escape'],
    'react/no-unstable-nested-components': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
