require('dotenv').config();

const baseConfig        = require('./base');
const path              = require('path');
const webpack           = require('webpack'); //to access built-in plugins
const HOST              = process.env.HOST || '127.0.0.1';
const PORT              = process.env.PORT || 8080;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = Object.assign({}, baseConfig, {
  cache   : true,
  devtool : 'cheap-module-eval-source-map',

  output : {
    /**
     * If your configuration creates more than a single "chunk" (as with multiple entry points
     * or when using plugins like CommonsChunkPlugin), you should use substitutions to ensure that
     * each file has a unique name.
     */
    // filename   : 'app.js',
    filename : '[name].js',

    publicPath : '/'
  },

  // Webpack Dev Server settings
  devServer : {
    port               : PORT,
    host               : HOST,
    inline             : true,
    hot                : true,
    open               : false, // Browser will automatically open page.
    contentBase        : path.join(__dirname, '../src/'),
    historyApiFallback : true,
    hotOnly            : true,

    // webpack-dev-middleware options
    quiet        : false,
    noInfo       : false,
    lazy         : false,
    filename     : 'bundle.js',
    watchOptions : {
      //  Add a delay before rebuilding once the first file changed. This allows webpack to
      // aggregate any other changes made during this time period into one rebuild.
      aggregateTimeout : 800,
      poll             : 1000,
      ignored          : /node_modules/
    },

    overlay : {
      warnings : true,
      errors   : true
    },

    // To disable CORS
    proxy : {
      '/api' : {
        target      : {
          host     : '0.0.0.0',
          protocol : 'http:',
          port     : 8002
        },
        pathRewrite : {
          '^/api' : ''
        }
      }
    },

    // It's a required option.
    publicPath : '/',
    headers    : {
      'X-Custom-Header' : 'yes',

      // Headers for CORS
      'Access-Control-Allow-Origin'  : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers' : 'X-Requested-With, content-type, Authorization'
    },
    // stats      : { colors : true },
    stats      : {
      // `webpack --colors` equivalent
      colors : true,

      // Add --env information
      env : true,

      // Display the entry points with the corresponding bundles
      entrypoints : true,

      // Add information about the reasons why modules are included
      reasons : true,

      // Add built modules information
      modules : true,

      // Sort the modules by a field
      // You can reverse the sort with `!field`. Default is `id`.
      modulesSort : 'field',

      // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
      moduleTrace : true,

      // Show performance hint when file size exceeds `performance.maxAssetSize`
      performance : true,

      // Add errors
      errors : true,

      // Add details to errors (like resolving log)
      errorDetails : true,

      // Add chunk information (setting this to `false` allows for a less verbose output)
      chunks       : true,
      // Add built modules information to chunk information
      chunkModules : true,
      // Add the origins of chunks and chunk merging info
      chunkOrigins : true
    }
  },

  plugins : [
    new webpack.LoaderOptionsPlugin({
      options : {
        postcss : [
          require('autoprefixer')({
            browsers : [ 'last 4 versions' ]
          })
        ]
      }
    }),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      // Title not necessary if we're using VueMeta
      // title    : ''',
      template : './src/index.html',
      inject   : 'head',

      // Settings required to control the order in which chunks are injected.
      // We want to make sure the vendor chunk is injected before the main app chunk.
      chunks         : [ 'vendor', 'app' ],
      chunksSortMode : 'manual',

      // Development analytics code
      analyticsCode : 'UA-000000000-0'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      // Give the chunk a different name ex.filename: "vendor.js"
      // The name or list of names must match the name or names of the entry points that create
      // the async chunks.
      name : 'vendor',

      // Default: 2 children must share the module before it's separated
      // With more entries (Infinity), this ensures that no other module goes into the vendor chunk
      minChunks : 2,

      // Create an async commons chunk
      async : true,

      // Create an async commons chunk
      children : true
    })
  ]
});

config.module.rules.push({
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
            sourceMap : true
          }
        },
        {
          loader  : 'sass-loader',
          options : {
            indentedSyntax : true,
            sourceMap      : true
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
            sourceMap : true
          }
        },
        {
          loader  : 'sass-loader',
          options : {
            sourceMap : true
          }
        }
      ]
    }
  }
});

module.exports = config;
