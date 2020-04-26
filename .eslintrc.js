module.exports = {
  "extends": [
    "react-app", //已经加载了ts插件和启用了ts parser
    "eslint:recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",
    "plugin:prettier/recommended"
  ],
  rules: {
    "prettier/prettier": "warn",
    'react-hooks/exhaustive-deps': 'error',
  }
}
