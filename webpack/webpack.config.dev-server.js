var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
      "presets": ["es2015", "react", "stage-0"]
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
  // devtool: 'eval',
  // The configuration for the server-side rendering
  name: "server-side rendering",
  context: path.join(__dirname, "..", "app"),
  entry: {
    server: "./server"
  },
  target: "node",
  profile: true,
  output: {
    // The output directory as absolute path
    path: assetsPath,
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: "server.js",
    // The output path from the view of the Javascript
    publicPath: "/assets/",
    libraryTarget: "commonjs2"
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss-loader!resolve-url!sass?sourceMap'
        )
      }
    ])
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: [
      "app", "node_modules"
    ],
    alias: {
      phoenix: path.join(__dirname, '..', 'deps', 'phoenix', 'web', 'static', 'js', 'phoenix.js')
    }
  },
  plugins: [
    // We need to ignore VertX which is a dependency required by the es6-promise module
    // otherwise warnings are generated...
    new webpack.IgnorePlugin(/vertx/),
    new ExtractTextPlugin("styles/main.css"),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      __ISSERVER__: true
    }),
    new ManifestPlugin({
      fileName: 'build-manifest.json'
    }),
    new StatsPlugin('dev-server.json', {
      chunkModules: true,
      exclude: [/node_modules[\\\/]react/]
    })
  ]
};
