const webpack = require('webpack');
const path = require('path');
const pak = require('./package.json');

const webpackConfig = {
  context: __dirname,
  entry: {
    'heatmap-calendar-react': [
      path.resolve(__dirname, 'heatMapGraph.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    library: 'HeatmapCalendar',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
};

module.exports = webpackConfig;
