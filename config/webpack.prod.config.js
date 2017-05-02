const path = require('path');

const webpackConfig = require('./webpack.config');
const appConfig = require('./app.config');

webpackConfig.output = {
  path: path.resolve('', `./${appConfig.paths.dist.path}/`),
  publicPath: '',
  filename: `${appConfig.dist.javascriptsPath}/${appConfig.bundleNames.js}`,
};

module.exports = webpackConfig;
