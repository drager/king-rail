'use strict'

const path = require('path')
const webpack = require('webpack')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

const production = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    javascript: [
      'babel-polyfill',
      './src/index',
    ],
    html: './src/index.html'
  },
  output: {
    path: './dist',
    filename: 'king-rail.js',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },
  debug: !production,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loaders: [
          'babel?' + JSON.stringify({
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-stage-2'),
            ]
          }),
        ],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /pixi\.js/,
        loader: 'expose?PIXI'
      },
      {
        test: /phaser-split\.js$/,
        loader: 'expose?Phaser'
      },
      {
        test: /p2\.js/,
        loader: 'expose?p2'
      },
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', path.resolve('./node_modules')],
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
      __ROOT_PATH__: '"' + __dirname + '"',
    }),
  ],
};

if (production) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      test: /\.js$/,
    })
  )
} else {
  config.entry.javascript = ['stack-source-map/register', ...config.entry.javascript]
}

module.exports = config
