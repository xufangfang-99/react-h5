// @ts-check

/** @type {import("stylelint").Config} */
export default {
    extends: [
      "stylelint-config-standard"
    ],
    plugins: ["stylelint-prettier"],
    rules: {
      "prettier/prettier": true,
      "selector-class-pattern": null,
      "no-descending-specificity": null,
      "rule-empty-line-before": [
        "always",
        {
          ignore: ["after-comment", "first-nested"]
        }
      ],
      "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }]
    },
    ignoreFiles: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx", "dist/**/*"]
  };