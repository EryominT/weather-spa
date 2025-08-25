import antfu from '@antfu/eslint-config';

export default antfu(
  {
    formatters: {
      css: true,
    },
    stylistic: {
      semi: true,
    },
    typescript: {
      tsconfigPath: './tsconfig.json',
      overridesTypeAware: {
        'ts/no-unsafe-assignment': 'off',
        'ts/strict-boolean-expressions': 'off',
        'ts/no-unsafe-member-access': 'off',
        'ts/no-unsafe-call': 'off',
        'ts/switch-exhaustiveness-check': 'off',
        'ts/no-unsafe-return': 'off',
      },
    },
    rules: {
      'curly': ['error', 'multi-line'],
      'no-console': 'warn',
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  },
);
