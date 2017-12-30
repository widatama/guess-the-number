// we can just use the exact same webpack config by requiring it
// but make sure to delete the normal entry
/* eslint import/no-extraneous-dependencies: 0 */
const webpackConf = require('./webpack.config');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaTap = require('karma-tap');
const karmaTapPrettyReporter = require('karma-tap-pretty-reporter');
const karmaWebpack = require('karma-webpack');

delete webpackConf.entry;
webpackConf.node = {
  fs: 'empty',
};

module.exports = (config) => {
  config.set({
    plugins: [
      karmaChromeLauncher,
      karmaTap,
      karmaTapPrettyReporter,
      karmaWebpack,
    ],
    browsers: ['ChromeCanary'],
    frameworks: ['tap'],
    reporters: ['tap-pretty'],
    tapReporter: {
      prettifier: 'tap-summary',
    },
    // entry file for all tests
    files: [
      '../test/bundle.js',
    ],
    // pass the entry file to webpack for bundling.
    preprocessors: {
      '../test/bundle.js': ['webpack'],
    },
    client: {
      captureConsole: false,
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true,
    },
    singleRun: true,
    colors: true,
  });
};

