const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          publicPath: `/${appConfig.distPath}`,
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new ExtractTextPlugin('assets/stylesheets/[name].bundle.css'),
  ],
};
