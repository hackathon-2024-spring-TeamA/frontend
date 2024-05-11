/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:vitest/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "amplify/"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // it ではなく test の使用を強制
    "vitest/consistent-test-it": ["error", { fn: "test" }],
    // import の並び順を設定
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "object",
          "type",
          "index",
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: { order: "asc", caseInsensitive: true },
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
      },
    ],
  },
};
