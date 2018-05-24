import baseConfig from './base';

const path       = require('path');
const webpack    = require('webpack');

const config = Object.assign({}, baseConfig, {
  cache   : false,
  devtool : 'cheap-module-source-map',
  plugins : [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')({
            browsers: ['last 3 versions']
          }),
        ]
       }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production'
    }),
    new webpack.ProvidePlugin({
      $               : "jquery",
      jQuery          : "jquery",
      "window.jQuery" : "jquery",
      "gsap"          : "gsap"
    }),

  ]
});

config.devServer.port = 7000;
// config.module.rules.push()

module.exports = config;