const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const paths = require('../paths')

module.exports = env => {
  return [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['_temp'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: paths.source(),
          from: '**/*',
          globOptions: {
            // ignore all files with prefix "_"
            ignore: ['**/_*/**'],
          },
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
