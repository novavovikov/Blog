module.exports = env => {
  return {
    watch: env === 'development',
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
    module: require('./webpack/module')(env),
  }
}