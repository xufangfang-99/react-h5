import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import pluginMarkdown from "eslint-plugin-markdown";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  // 全局忽略
  {
    ignores: [
      "**/dist/*",
      "**/node_modules/*",
      "**/.vite/*",
      "**/coverage/*",
      "**/public/*",
      "**/*.d.ts",
      "**/vite.config.ts.timestamp-*",
      "pnpm-lock.yaml",
    ],
  },
  // JavaScript 基础配置
  {
    ...js.configs.recommended,
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
  // TypeScript 配置
  ...tseslint.config({
    extends: [...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/prefer-literal-enum-member": [
        "error",
        { allowBitwiseExpressions: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  }),
  // React 配置（只对 apps 目录生效）
  {
    files: ["apps/**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/no-unknown-property": "off",
      "react/display-name": "off",
    },
  },
  // Node.js 配置（构建脚本、配置文件等）
  {
    files: ["**/*.config.{js,ts,mjs,cjs}", "**/scripts/**/*", "build/**/*"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // Markdown 文件配置
  {
    files: ["**/*.md"],
    plugins: {
      markdown: pluginMarkdown,
    },
    processor: "markdown/markdown",
  },
  // Markdown 中的代码块配置
  {
    files: ["**/*.md/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "padded-blocks": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-undef": "off",
      "react-refresh/only-export-components": "off",
      "prettier/prettier": "off",
    },
  },
  // packages 目录特殊配置
  {
    files: ["packages/**/*.{ts,tsx,js,jsx}"],
    rules: {
      // packages 中可能不需要 React 相关的规则
      "react-refresh/only-export-components": "off",
    },
  },
]);
