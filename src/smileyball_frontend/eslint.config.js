import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslint from '@eslint/js';
import * as tseslint from "typescript-eslint";

export default tseslint.config(eslint.configs.recommended, {
  plugins: {
    "@typescript-eslint": tseslint.plugin,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  languageOptions: {
    parser: tseslint.parser,
    globals: {
      ...globals.browser,
      ...globals.node
    },
    parserOptions: {
      ecmaVersion: 2020,
      projectService: false,
      project: "./tsconfig.eslint.json",
      tsconfigRootDir: import.meta.dirname,
    },
  },
  files: ["**/*.{ts,tsx}"],
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "error",
    "no-unused-vars": "warn"
  },
  ignores: ["dist"],
  linterOptions: {
    reportUnusedDisableDirectives: "warn",
  },
});
