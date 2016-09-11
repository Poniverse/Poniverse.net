var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var ManifestPlugin = require('webpack-manifest-plugin');
var StatsPlugin = require('stats-webpack-plugin');

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      "presets": ["react-hmre", "es2015", "react", "stage-0"]
    },
    // include: path.join(__dirname, '..', 'app'),
    exclude: /node_modules/
  },
  {test: /\.json$/, loader: "json-loader"},
  {
    test: /\.(png|jpg|jpeg|gif|woff2?|ttf|eot|svg)$/,
    loader: 'url',
    query: {
      name: '[hash].[ext]',
      limit: 10000
    }
  },
  {test: /\.html$/, loader: 'html-loader'}
];

module.exports = {
  // eval - Each module is executed with eval and //@ sourceURL.
  devtool: 'source-map',
  // The configuration for the client
  name: 'browser',

  profile: true,

  context: path.join(__dirname, '..', 'app'),
  // Multiple entry with hot loader
  // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      './client',
    ]
  },
  output: {
    // The output directory as absolute path
    path: assetsPath,
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: '[name].js',
    // The output path from the view of the Javascript
    publicPath: '/assets/'
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.scss$/,
        loader: 'style!css!postcss-loader!resolve-url!sass?sourceMap&outputStyle=expanded'
      }
    ])
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: [
      'app', 'node_modules'
    ],
    alias: {
      phoenix: path.join(__dirname, '..', 'deps', 'phoenix', 'web', 'static', 'js', 'phoenix.js')
    }
  },

  postcss: [autoprefixer],

  plugins: [
    // We need to ignore VertX which is a dependency required by the es6-promise module
    // otherwise warnings are generated...
    new webpack.IgnorePlugin(/vertx/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __ISSERVER__: false
    }),
    new ManifestPlugin({
      fileName: 'build-manifest.json'
    }),
    new StatsPlugin('dev-client.json', {
      chunkModules: true,
      exclude: [/node_modules[\\\/]react/]
    })
  ]
};
