const path               = require('path');
const webpack            = require('webpack');
const baseConfig         = require('./base');
const UglifyJSPlugin     = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');

// Options
const enableSources = (process.env.NODE_ENV === 'production');
const devTool = (process.env.NODE_ENV === 'production') ? '' : 'source-map';

const config = Object.assign({}, baseConfig, {
  cache   : false,
  devtool : devTool,

  output : {
    /**
     * If your configuration creates more than a single "chunk" (as with multiple entry points
     * or when using plugins like CommonsChunkPlugin), you should use substitutions to ensure that
     * each file has a unique name.
     */
    filename : '[name].js',

    path       : path.resolve(__dirname, '../server/public'),
    publicPath : '/'
  },

  plugins : [

    new CleanWebpackPlugin([ 'dist' ], {
      root : path.resolve(__dirname, '../')
    }),

    // Copy favicons to server/public/favicons
    new CopyWebpackPlugin([
      {
        from : path.resolve(__dirname, '../src/static/favicons'),
        to   : 'favicons'
      }
    ]),

    new webpack.LoaderOptionsPlugin({
      options : {
        postcss : [
          require('autoprefixer')({
            browsers : [ 'last 4 versions' ]
          })
        ]
      }
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('production')
    }),

    // extractedCSS,
    new ExtractTextPlugin('style.css'),

    new UglifyJSPlugin({
      sourceMap       : enableSources,
      cache           : true,
      parallel        : true,
      uglifyOptions   : {
        ie8      : false,
        ecma     : 6,
        // parse    : {},
        mangle   : true,
        //   output   : {
        //     // Defaults are already optimized
        //   },
        compress : {
          drop_console : true
        },
        warnings : true
      },
      extractComments : false
    }),

    // new HtmlWebpackPlugin({
    //   title    : '',
    //   template : './src/index.html',
    //   inject   : 'head',
    //   minify   : {
    //     collapseWhitespace          : true,
    //     conservativeCollapse        : true,
    //     collapseBooleanAttributes   : true,
    //     collapseInlineTagWhitespace : true
    //   },
    //
    //   // Settings required to control the order in which chunks are injected.
    //   // We want to make sure the vendor chunk is injected before the main app chunk.
    //   chunks         : ['vendor', 'app'],
    //   chunksSortMode : 'manual'
    // }),

    new webpack.optimize.CommonsChunkPlugin({
      // The name or list of names must match the name or names of the entry points that create
      // the async chunks.
      name : 'vendor',

      // Default: 2 children must share the module before it's separated
      // With more entries (Infinity), this ensures that no other module goes into the vendor
      // chunk
      minChunks : 2,

      /**
       * Create an async commons chunk. Instead of moving common modules into the parent (which
       * increases initial load time) a new async-loaded additional commons chunk is used.
       * This is automatically downloaded in parallel when the additional chunk is downloaded.
       */
      async : true,

      // Create an async commons chunk
      children : true
    })
  ]
});

config.module.rules.push({
  // Contrary to what its name indicates, sass-loader parses SCSS syntax by default.
  // If you actually want to use the indented SASS syntax, you have to configure vue-loader's
  // options for sass-loader accordingly.
  test    : /\.vue$/,
  loader  : 'vue-loader',
  options : {
    loaders : {
      sass : [
        {
          loader : 'vue-style-loader'
        },
        {
          loader  : 'css-loader',
          options : {
            sourceMap : enableSources
          }
        },
        {
          loader  : 'sass-loader',
          options : {
            indentedSyntax : true,
            sourceMap      : enableSources
          }
        }
      ],
      scss : [
        {
          loader : 'vue-style-loader'
        },
        {
          loader  : 'css-loader',
          options : {
            sourceMap : enableSources
          }
        },
        {
          loader  : 'sass-loader',
          options : {
            sourceMap : enableSources
          }
        }
      ]
    }
  }
});

/* If we need to extract styles.
config.module.rules.push({
  test    : /\.vue$/,
  loader  : 'vue-loader',
  options : {
    loaders : {
      sass : ExtractTextPlugin.extract({
        use      : [
          {
            loader  : 'css-loader',
            options : {
              sourceMap : enableSources
            }
          },
          {
            loader  : 'sass-loader',
            options : {
              indentedSyntax : true,
              sourceMap      : enableSources
            }
          }
        ],
        fallback : 'vue-style-loader'
      }),
      scss : ExtractTextPlugin.extract({
        use      : [
          {
            loader  : 'css-loader',
            options : {
              sourceMap : enableSources
            }
          },
          {
            loader  : 'sass-loader',
            options : {
              sourceMap : enableSources
            }
          }
        ],
        fallback : 'vue-style-loader'
      })
    }
  }
});
*/

module.exports = config;
