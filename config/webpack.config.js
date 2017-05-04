const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssImport = require('postcss-import');
const postcssNext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');

const appConfig = require('./app.config');

const environment = process.env.NODE_ENV;

const copyWebpackPluginPatterns = [{
  from: `${appConfig.paths.asset.imagesPath}`,
  to: `${appConfig.paths.dist.imagesPath}`,
  context: path.resolve('', `./${appConfig.paths.asset.path}`),
}];

const htmlWebpackPluginConfig = {
  title: appConfig.title,
  template: `${appConfig.paths.src.templatePath}/index.pug`,
  environment,
};

if (environment !== 'development') {
  htmlWebpackPluginConfig.excludeChunks = ['dev'];
}

module.exports = {
  context: path.resolve('', `./${appConfig.paths.src.path}`),
  entry: {
    app: './javascripts/main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    postcssImport({
                      path: ['node_modules', './src'],
                    }),
                    postcssNext,
                    postcssNested,
                  ];
                },
              },
            },
          ],
          publicPath: `/${appConfig.paths.dist}`,
        }),
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin(copyWebpackPluginPatterns),
    new ExtractTextPlugin(`${appConfig.paths.dist.stylesheetsPath}/${appConfig.bundleNames.css}`),
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
  ],
};
