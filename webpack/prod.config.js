const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('dotenv').config();

module.exports = {
  devtool: 'source-map',

  entry: ['bootstrap-loader/extractStyles'],

  output: {
    publicPath: 'dist/',
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /(node_modules)\/react-toolbox/,
      loader: 'style!css!postcss-loader!sass',
    },
    {
      test: /(\.scss|\.css)$/,
      include : /(node_modules)\/react-toolbox/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
      'SERVER_URL': '"https://dhamun.herokuapp.com"'
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};
