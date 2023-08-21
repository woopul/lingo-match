/** @type {import("prettier").Options} */
module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxSingleQuote: false,
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['**/*.css', '**/*.scss'],
      options: {
        printWidth: 120,
      },
    },
  ],
  // TODO: solve this - not working with prettier 3.0
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  tailwindConfig: './tailwind.config.js',
  trailingComma: 'all',
};
