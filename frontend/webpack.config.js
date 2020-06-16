const path = require('path')

module.exports = env => ({
  entry: require('./webpack/entry')(env),
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json',
    ],
  },
  mode: env,
  watch: env === 'development',
  watchOptions: {
    ignored: 'node_modules'
  },
  optimization: require('./webpack/optimization')(env),
  module: require('./webpack/module')(env),
  plugins: require('./webpack/plugins')(env),
})