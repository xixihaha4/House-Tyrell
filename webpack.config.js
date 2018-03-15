const path = require ('path');
const webpack = require('webpack');

const BUILD_DIR = path.join(__dirname, '/client/dist');
const APP_DIR = path.join(__dirname, '/client/src');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?/,
        use: [
          {
            loader: 'babel-loader',
             query: {
               presets: ['react', 'es2015']
             }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules', 'react')
    }
  }
};
