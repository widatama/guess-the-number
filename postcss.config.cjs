/* eslint-env node */
module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-import': {
      path: ['./node_modules', './src'],
    },
    autoprefixer: {},
  },
};
