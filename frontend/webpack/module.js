const fileLoaderWithOptions = (env) => ({
  loader: 'file-loader',
  options: {
    outputPath: 'src/',
    name: '[name].[ext]',
  },
})

module.exports = (env) => ({
  rules: [
    {
      test: /\.(ts|tsx)$/i,
      use: [
        {
          loader: 'ts-loader',
          options: {
            context: __dirname,
            configFile: require.resolve('../tsconfig.json'),
          },
        },
      ],
    },
    {
      test: /\.(js|jsx)$/i,
      enforce: 'pre',
      use: 'source-map-loader',
    },
    {
      test: /\.css$/,
      enforce: 'pre',
      use: [
        'style-loader',
        'css-modules-typescript-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: env === 'development'
                ? '[local]--[hash:base64:3]'
                : '[hash:base64:7]',
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-import')(),
              require('postcss-preset-env')({
                stage: 2,
              }),
              require('postcss-nested')(),
            ],
          },
        },
      ],
    },
    {
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /inline/,
          use: 'svg-inline-loader',
        },
        {
          use: fileLoaderWithOptions(env),
        },
      ],
    },
    {
      test: /\.(gif|png|jpe?g|ico)$/i,
      use: fileLoaderWithOptions(env),
    },
  ],
})
