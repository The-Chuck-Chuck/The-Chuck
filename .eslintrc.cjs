module.exports = {
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "react-hooks", "unused-imports", "prettier"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: "warn",
    "no-unused-vars": "warn",
    "unused-imports/no-unused-imports": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "prefer-arrow-callback": "warn",
    "func-style": ["warn", "expression", { allowArrowFunctions: true }],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "no-console": "warn",
    "prettier/prettier": "warn",
    quotes: [2, "double", { avoidEscape: false }],
  },
  overrides: [
    {
      files: ["**/*.{js,jsx}"],
    },
  ],
};
