const path = require('path');

const Webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = require('./webpack.config');
const appConfig = require('./app.config');

webpackConfig.output = {
  path: path.resolve('', `./${appConfig.paths.dist.path}/`),
  publicPath: '',
  filename: `${appConfig.paths.dist.javascriptsPath}/${appConfig.bundleNames.js}`,
};

webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  new OptimizeCSSPlugin({
    cssProcessorOptions: { discardComments: { removeAll: true } },
  }),
  new Webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
]);

module.exports = webpackConfig;
