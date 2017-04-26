var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './app/index.jsx',
    './app/styles/app.less',
  ],
  output: {
    filename: 'bundle.js',
    path: './dist',
    publicPath: "/dist/"
  },
  devtool: 'source-map',
  devServer: { inline: false },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.less$/, 
        exclude: /node_modules/, 
        loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 5 version!less?sourceMap"),
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  plugins: [
      new ExtractTextPlugin("styles/style.css", {allChunks: true})
  ]
}