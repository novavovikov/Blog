module.exports = () => ({
  stats: 'errors-only',
  historyApiFallback: true,
  writeToDisk: true,
  hot: true,
  host: '0.0.0.0',
  port: 3000,
  proxy: {
    '/**': {
      target: 'http://backend:5000',
    },
  },
})
