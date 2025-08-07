export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
    "stylelint-prettier/recommended",
    "stylelint-config-html/html",
  ],
  plugins: ["stylelint-prettier"],
  rules: {
    "prettier/prettier": true,
    "selector-class-pattern": null,
    "no-descending-specificity": null,
    "function-url-quotes": "always",
    "selector-attribute-quotes": "always",
    "font-family-no-missing-generic-family-keyword": null,
    "scss/no-global-function-names": null,
    "scss/dollar-variable-pattern": null,
    "scss/dollar-variable-colon-space-after": null,
    "scss/dollar-variable-colon-space-before": null,
    "scss/at-import-partial-extension": null,
    "scss/at-import-no-partial-leading-underscore": null,
    "unit-no-unknown": [
      true,
      {
        ignoreUnits: ["rpx"],
      },
    ],
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["page"],
      },
    ],
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
          "unocss",
        ],
      },
    ],
    "property-no-vendor-prefix": [
      true,
      {
        ignoreProperties: [
          "appearance",
          "backdrop-filter",
          "clip-path",
          "mask-image",
          "tap-highlight-color",
          "touch-callout",
        ],
      },
    ],
    "value-no-vendor-prefix": [
      true,
      {
        ignoreValues: ["box", "inline-box"],
      },
    ],
    "import-notation": null,
    "no-empty-source": null,
    "custom-property-pattern": null,
    "keyframes-name-pattern": null,
    "scss/at-mixin-pattern": null,
    "scss/at-function-pattern": null,
    "scss/percent-placeholder-pattern": null,
    "declaration-block-no-redundant-longhand-properties": null,
  },
  ignoreFiles: [
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "**/*.json",
    "**/*.md",
    "**/*.yaml",
    "**/dist/**",
    "**/node_modules/**",
    "**/public/**",
    "**/.vite/**",
    "**/.husky/**",
    "**/coverage/**",
  ],
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
    {
      files: ["**/*.css"],
      customSyntax: "postcss",
    },
    {
      files: ["**/*.html"],
      customSyntax: "postcss-html",
    },
  ],
};
