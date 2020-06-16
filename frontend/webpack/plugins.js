const webpack = require('webpack')

module.exports = env => {
  return [
    new webpack.HotModuleReplacementPlugin(),
  ]
}