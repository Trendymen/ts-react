module.exports = {
  "extends": [
    "react-app", //已经加载了ts插件和启用了ts parser
    "eslint:recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  rules: {
    "prettier/prettier": "warn",
    'react-hooks/exhaustive-deps': 'error'
  }
}
