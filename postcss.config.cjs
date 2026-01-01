/* global node */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-import': {
      path: ['./node_modules', './src'],
    },
  },
};
