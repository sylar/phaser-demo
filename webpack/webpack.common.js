const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
module.exports = {
  entry: ['./src/game.ts'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{ test: /\.tsx?$/, include: [path.join(__dirname, '../src'), path.join(__dirname, '../pwa')], loader: 'ts-loader' }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ gameName: 'Phaser 3 Demo Game', template: 'src/index.html' }),
    new CopyWebpackPlugin({patterns:[
      { from: 'src/assets', to: 'assets' },
      { from: 'pwa/manifest.json', to: 'manifest.json' },
      { from: 'pwa/icons', to: 'icons' },
      { from: 'src/assets/favicon.ico', to: 'favicon.ico' }
    ]}),
    new InjectManifest({
      swSrc: path.join(process.cwd(), 'pwa/sw.ts'),
      swDest: path.join(process.cwd(), 'dist/sw.js')
    })
  ]
}