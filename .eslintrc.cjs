module.exports = {
  // files: ["src/**/*.ts"],
  env: {
    es2020: true,
    node: true,
  },
  // extends: ["standard"],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 11,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: [`@typescript-eslint`],
  extends: [
    `eslint:recommended`,
    `plugin:@typescript-eslint/recommended`, // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    `prettier/@typescript-eslint`, // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // Make sure that plugin:prettier/recommended is the last configuration in the extends array
    `plugin:prettier/recommended`, // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    semi: [`error`, `always`],
    "max-len": [
      `error`,
      {
        code: 160,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreTrailingComments: true,
      },
    ],
    "no-tabs": `error`,
    "no-unexpected-multiline": `error`,
    "quote-props": [`error`, `as-needed`],
    quotes: [`error`, `backtick`],
    "arrow-body-style": [`error`, `as-needed`],
    "block-spacing": [`error`, `always`],
    "brace-style": [`error`, `1tbs`],
    "comma-dangle": [`error`, `only-multiline`],
    "eol-last": [`error`, `unix`],
    "linebreak-style": [`error`, `unix`],
    "no-console": `error`,
    "no-alert": `error`,
    "no-debugger": `error`,
    "@typescript-eslint/explicit-function-return-type": `error`,
  },
};
