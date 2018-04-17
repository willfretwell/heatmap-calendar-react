const webpack = require('webpack');
const path = require('path');
const pak = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';

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
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.*css$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader'
            ]
        })
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    new ExtractTextPlugin({
      filename: 'heatMapGraph.css',
  }),
  ],
};

if (nodeEnv === 'development') {
  webpackConfig.devtool = 'source-map';
  webpackConfig.devServer = { contentBase: './demo' };
  webpackConfig.entry['heatmap-calendar-react'].unshift('webpack-dev-server/client?http://0.0.0.0:8080/');
  webpackConfig.entry['heatmap-calendar-react'].push(path.resolve(__dirname, 'demo', 'demo.jsx'));
  webpackConfig.output.publicPath = '/';
}

if (nodeEnv === 'demo') {
  webpackConfig.entry['heatmap-calendar-react'].push(path.resolve(__dirname, 'demo', 'demo.jsx'));
  webpackConfig.output.path = path.resolve(__dirname, 'demo');
}

if (nodeEnv === 'development' || nodeEnv === 'demo') {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    COMPONENT_NAME: JSON.stringify(pak.name),
    COMPONENT_VERSION: JSON.stringify(pak.version),
    COMPONENT_DESCRIPTION: JSON.stringify(pak.description),
  }));
}

if (nodeEnv === 'production') {
  webpackConfig.externals = {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  };
  webpackConfig.output.path = path.resolve(__dirname, 'build');
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    sourceMap: false,
  }));
}

module.exports = webpackConfig;