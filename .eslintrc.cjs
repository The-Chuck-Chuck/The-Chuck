module.exports = {
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "react-hooks"],
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
    "no-console": "warn",
    "prettier/prettier": "warn",
  },
  overrides: [
    {
      files: ["**/*.{js,jsx}"],
    },
  ],
};
