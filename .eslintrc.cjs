//{
//  "extends": ["taro/react"],
//  "rules": {
//    "react/jsx-uses-react": "off",
//    "react/react-in-jsx-scope": "off"
//  }
//}
// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'taro/react',
    'prettier', // Make sure this is always the last configuration in the extends array.
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error', // Display prettier errors as ESLint errors
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules', 'dist', '.eslintrc.cjs'],
};
