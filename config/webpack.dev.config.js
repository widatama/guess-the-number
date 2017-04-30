const path = require('path');

const webpackConfig = require('./webpack.config');
const appConfig = require('./app.config');

webpackConfig.entry.dev = './javascripts/dev.js';

webpackConfig.output = {
  path: path.resolve('', `./${appConfig.distPath}`),
  publicPath: '/',
  filename: 'assets/javascripts/[name].bundle.js',
};

webpackConfig.devtool = 'eval-source-map';

webpackConfig.devServer = {
  noInfo: false,
  hot: true,
  contentBase: `${appConfig.distPath}/`,
};

module.exports = webpackConfig;
