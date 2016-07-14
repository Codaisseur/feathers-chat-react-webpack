var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, 'app', 'index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './app/index'
  ],
  // output: {
  //   path: __dirname + '/dist',
  //   filename: 'index_bundle.js',
  //   publicPath: '/'
  // },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      },
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    HTMLWebpackPluginConfig
  ]
};
