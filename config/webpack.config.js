const path = require('path');

const Webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const WebappManifest = require('webapp-manifest-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');

const WebappManifestPlugin = WebappManifest.default;
const WebappManifestIcon = WebappManifest.FAVICON_PLUGIN;

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
  htmlWebpackPluginConfig.excludeAssets = [/dev/];
} else {
  htmlWebpackPluginConfig.excludeAssets = [/appcss.*.js/, /devcss.*.js/];
}

const webappManifestPluginConfig = {
  name: 'Guess the Number',
  shortName: 'Guess the Number',
  description: 'A simple guess the number game',
  dir: 'auto',
  lang: 'en-US',
  display: 'standalone',
  orientation: 'portrait',
  startUrl: '/',
  backgroundColor: '#fff',
  icons: WebappManifestIcon,
  scope: '/',
};

module.exports = {
  context: path.resolve('', `./${appConfig.paths.src.path}`),
  entry: {
    appjs: './javascripts/main.js',
    appcss: './stylesheets/main.css',
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
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  target: 'web',
  plugins: [
    new CopyWebpackPlugin(copyWebpackPluginPatterns),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(environment),
      },
    }),
    new ExtractTextPlugin(`${appConfig.paths.dist.stylesheetsPath}/${appConfig.bundleNames.css}`),
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new HtmlWebpackExcludeAssetsPlugin(),
    new FaviconWebpackPlugin('../assets/images/favicon.png'),
    new WebappManifestPlugin(webappManifestPluginConfig),
  ],
};
