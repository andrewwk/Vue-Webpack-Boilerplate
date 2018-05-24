require('dotenv').config();
const path = require('path');

const baseConfig = {
  entry : {
    app    : path.join(__dirname, '/../src/index.js'),
    vendor : [ 'jquery', 'gsap', 'vue', 'vue-router' ]
  },

  resolve : {
    extensions : [ '.js', '.jsx', '.vue' ],
    alias      : {
      jquery           : 'jquery/dist/jquery.slim.js',
      $                : 'jquery/dist/jquery.slim.js',
      vue              : 'vue/dist/vue.js',
      'metal-position' : path.join(__dirname, '../node_modules/metal-position/lib/all/position')
    }
  },

  node : {
    fs  : 'empty',
    net : 'empty',
    tls : 'empty'
  },

  module : {
    // Special compilation rules; Every rule has one or more loaders.
    // Loaders is used in Webpack 1, and Rules in Webpack 2/3.
    // They say that "Loaders" in the future will be deprecated in favour of module.rules.
    rules : [
      {
        // Ask webpack to check: If this file ends with .js, then apply some transforms
        // test: /\.js$/,
        test : /\.(js|jsx)$/,

        // NOTE: Within a rule, use or loaders can specify the list of loaders.
        // use is the new keyword but loaders can still be used and will not generate a warning.
        // Note: All loader names must use the full package name; -loader is required.
        // Transform it with babel
        use : [ 'babel-loader' ],

        // don't transform node_modules folder (which don't need to be compiled)
        // exclude: /node_modules/,
        exclude : /node_modules/,
        include : [
          path.join(__dirname, '/../src/')
        ]
      },

      // {
      //   test    : /\.(glsl|frag|vert)$/,
      //   use     : [
      //     'raw-loader',
      //     'glslify-loader'
      //   ],
      //   exclude : /node_modules/
      // },

      // {
      // Contrary to what its name indicates, sass-loader parses SCSS syntax by default.
      // If you actually want to use the indented SASS syntax, you have to configure vue-loader's
      // options for sass-loader accordingly.
      //   test    : /\.vue$/,
      //   loader  : 'vue-loader',
      //   options : {
      //     loaders : {
      //       scss : 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
      //       sass : 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style
      // lang="sass"> } } },

      // {
      //   test: /\.(glsl|vs|fs)$/,
      //   use: ['shader-loader'],
      //   options: {
      //     glsl: {
      //       chunkPath: resolve("/glsl/chunks")
      //     }
      //   }
      // },

      // NOTE: Like in webpack 1, loaders can be chained to pass results from loader to loader.
      // Using the rule.use configuration option, use can be set to an array of loaders. In
      // webpack 1, loaders were commonly chained with !. This style is only supported using the
      // legacy option module.loaders.
      // {
      //   test : /\.sass/,
      //   use  : [
      //     {
      //       loader : 'style-loader'
      //     },
      //     {
      //       loader : 'css-loader'
      //     },
      //     {
      //       loader : 'postcss-loader'
      //     },
      //     {
      //       loader  : 'sass-loader',
      //       options : {
      //         indentedSyntax : true,
      //         outputStyle    : 'expanded'
      //       }
      //     }
      //   ]
      // },
      // {
      //   test : /\.less/,
      //   use  : [
      //     'style-loader',
      //     'css-loader',
      //     'postcss-loader',
      //     'less-loader'
      //   ]
      // },
      // NOTE: No longer required. When no loader has been configured for a JSON file,
      // webpack will automatically try to load the JSON file with json-loader
      // {
      //   test: /\.json/,
      //   use: 'json-loader'
      // },
      {
        test : /\.svg$/,
        use  : [
          {
            loader : 'vue-svg-loader'
            // options : {
            //   removeSVGTagAttrs : false
            // }
          }
        ]
      },
      {
        test : /\.styl$/,
        use  : [
          {
            loader : 'style-loader'
          },
          {
            loader : 'css-loader'
          },
          {
            loader : 'postcss-loader'
          },
          {
            loader : 'stylus-loader'
          }
        ]
      },
      {
        test : /\.(png|jpg|gif|woff|woff2|eot|ttf|webm|pdf)$/,
        use  : 'file-loader'
      },
      {
        test : /\.(mp4|ogg)$/,
        use  : 'file-loader'
      }
    ]
  }
};

module.exports = baseConfig;
