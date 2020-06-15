module.exports = (env) => ({
  minimize: env === 'production',
  moduleIds: 'named',
  chunkIds: 'named',
})
