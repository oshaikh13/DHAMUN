const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').config();

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'bootstrap-loader',
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    publicPath: '/dist/',
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /(node_modules)\/react-toolbox/,
      loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass',
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
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
      'SERVER_URL': '"http://localhost:8000"'
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
    }),
  ],
};
