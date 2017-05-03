// All paths are from app root

const config = {
  distPath: 'public',
  srcPath: 'src',
  templatePath: 'src/templates',
  configPath: 'config',
  title: 'Nub',
  bundleNames: {
    js: '[name].bundle.js',
    css: '[name].bundle.css',
    images: '[name].[ext]',
  },
  paths: {
    config: 'config',
    src: {
      path: 'src',
      templatePath: 'templates',
      javascriptsPath: 'javascripts',
      stylesheetsPath: 'stylesheets',
    },
    asset: {
      path: 'assets',
      imagesPath: 'images',
    },
    dist: {
      path: 'public',
      javascriptsPath: 'assets/javascripts',
      stylesheetsPath: 'assets/stylesheets',
      imagesPath: 'assets/images',
    },
  },
};

module.exports = config;
