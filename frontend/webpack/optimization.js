module.exports = (env) => ({
  minimize: env === 'production',
  splitChunks: {
    chunks: 'all',
    minSize: 14000,
    minChunks: 1,
    maxInitialRequests: 10,
    maxAsyncRequests: 10,
    automaticNameDelimiter: '-',
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10,
      },
      default: {
        minChunks: 1,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
})
