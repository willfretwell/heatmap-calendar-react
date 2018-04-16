const webpack = require('webpack');
const path = require('path');
const pak = require('./package.json');

const webpackConfig = {
  context: __dirname,
  entry: {
    'heatmap-calendar-react': [
      path.resolve(__dirname, 'src', 'index.jsx'),
    ],
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    library: 'HeatMapGraph',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
            'css-loader'
        ]
     },
        {
            test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?name=src/images/[name].[ext]"
        } 
    ],
  },
};

module.exports = webpackConfig;
