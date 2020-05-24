const paths = require('./paths')

module.exports = env => ({
  entry: require('./webpack/entry')(env),
  output: {
    path: paths.output(),
    filename: '[name].[ext]',
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
  optimization: require('./webpack/optimization')(env),
  module: require('./webpack/module')(env),
  plugins: require('./webpack/plugins')(env),
  devServer: require('./webpack/devServer')(env),
})
