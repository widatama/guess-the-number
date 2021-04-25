const title = 'Guess the Number';

module.exports = {
  chainWebpack(config) {
    config.entry('app').clear().add('./src/main.js');
    config.plugin('html').tap((args) => {
      const conf = args;
      conf[0].title = title;
      conf[0].favicon = 'public/favicon.png';

      return conf;
    });
  },
  devServer: {
    port: 7654,
  },
  lintOnSave: false,
  pwa: {
    name: title,
    themeColor: '#42b983',
    manifestOptions: {
      background_color: '#333333',
      icons: [
        {
          src: './favicon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './favicon.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: './favicon.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: './favicon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
      appleTouchIcon: 'favicon.png',
      maskIcon: 'favicon.png',
      msTileImage: 'favicon.png',
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/guess-the-number' : './',
};
