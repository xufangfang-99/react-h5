import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import pluginMarkdown from "eslint-plugin-markdown";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  globalIgnores([
    "**/.*",
    "dist/*",
    "*.d.ts",
    "public/*",
    "src/assets/**",
    "src/**/iconfont/**",
  ]),
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        // React 全局变量
        React: "readonly",
        JSX: "readonly",
        // 工具类型
        RefType: "readonly",
        EmitType: "readonly",
        ComponentRef: "readonly",
        AnyFunction: "readonly",
        Writable: "readonly",
        Nullable: "readonly",
        NonNullable: "readonly",
        Recordable: "readonly",
        ReadonlyRecordable: "readonly",
        Indexable: "readonly",
        DeepPartial: "readonly",
        Without: "readonly",
        Exclusive: "readonly",
        TimeoutHandle: "readonly",
        IntervalHandle: "readonly",
        Effect: "readonly",
        ChangeEvent: "readonly",
        WheelEvent: "readonly",
        ImportMetaEnv: "readonly",
        Fn: "readonly",
        PromiseFn: "readonly",
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "no-debugger": "off",
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
  ...tseslint.config({
    extends: [...tseslint.configs.recommended],
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
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
  {
    files: ["**/*.d.ts"],
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "no-restricted-syntax": "off",
      "unused-imports/no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.?([cm])js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
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
    files: ["**/*.md/*.js", "**/*.md/*.jsx", "**/*.md/*.ts", "**/*.md/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    rules: {
      // 在 Markdown 代码块中放宽一些规则
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "padded-blocks": "off",
      "import/no-unresolved": "off",
      "node/no-missing-import": "off",
      "node/no-missing-require": "off",
      "node/no-unpublished-import": "off",
      "node/no-unpublished-require": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-undef": "off",
      "react-refresh/only-export-components": "off",
      "prettier/prettier": "off",
    },
  },
]);
