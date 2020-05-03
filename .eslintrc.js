module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020
  },
  ignorePatterns: ['node_modules/'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [
        '**/tests/**/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
