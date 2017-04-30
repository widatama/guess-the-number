const path = require('path');

const webpackConfig = require('./webpack.config');
const appConfig = require('./app.config');

webpackConfig.output = {
  path: path.resolve('', `./${appConfig.distPath}/`),
  publicPath: '',
  filename: 'assets/javascripts/[name].bundle.js',
};

module.exports = webpackConfig;
