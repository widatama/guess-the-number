const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const appConfig = require('./app.config');

const environment = process.env.NODE_ENV;

const htmlWebpackPluginConfig = {
  title: appConfig.appTitle,
  template: `!!pug-loader!${appConfig.templatePath}/index.pug`,
  environment,
};

if (environment !== 'development') {
  htmlWebpackPluginConfig.excludeChunks = ['dev'];
}

module.exports = {
  context: path.resolve('', `./${appConfig.srcPath}`),
  entry: {
    app: './javascripts/main.js',
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
  ],
};
