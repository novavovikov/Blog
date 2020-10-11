const { root, scriptsOutput } = require('./paths')

module.exports = env => {
  const ENV = env.development ? 'development' : 'production'

  return {
    context: root,
    entry: require('./webpack/entry')(ENV),
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
    mode: ENV,
    optimization: require('./webpack/optimization')(ENV),
    module: require('./webpack/module')(ENV),
    plugins: require('./webpack/plugins')(ENV),
  }
}
