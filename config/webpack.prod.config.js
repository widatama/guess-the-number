/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');

const Webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const webpackConfig = require('./webpack.config');
const appConfig = require('./app.config');

const workboxPluginConfig = {
  globDirectory: path.resolve('', `./${appConfig.paths.dist.path}`),
  globPattern: ['**/*.{js,html,css}'],
  swDest: path.resolve('', `./${appConfig.paths.dist.path}/sw.js`),
  clientsClaim: true,
  skipWaiting: true,
};

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
  new WorkboxPlugin(workboxPluginConfig),
]);

module.exports = webpackConfig;
