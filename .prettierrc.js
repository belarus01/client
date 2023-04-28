module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: 'typescript',
      plugins: ['prettier-plugin-ts'],
    },
  ],
};
