const { root, scriptsOutput } = require('./paths')

module.exports = env => ({
  context: root,
  entry: require('./webpack/entry')(env),
  output: {
    path: scriptsOutput,
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
    ignored: 'node_modules',
  },
  optimization: require('./webpack/optimization')(env),
  module: require('./webpack/module')(env),
  plugins: require('./webpack/plugins')(env),
})