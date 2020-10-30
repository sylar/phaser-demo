const path = require('path')
const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const JavaScriptObfuscator = require('webpack-obfuscator')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const prod = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          filename: '[name].[contenthash].bundle.js'
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [ 
          path.resolve(__dirname, 'vendors.*.js') 
      ],
      enforce: 'post',
      use: { 
          loader: JavaScriptObfuscator.loader, 
          options: {
            rotateStringArray: true,
            stringArray: true,
            // stringArrayEncoding: 'base64', // disabled by default
            stringArrayThreshold: 0.75
          }
      }
  }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

module.exports = merge(common, prod)
