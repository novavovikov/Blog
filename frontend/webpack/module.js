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
      use: 'ts-loader',
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
        {
          loader: 'file-loader',
          options: {
            name: './styles/[name].[ext]',
          },
        },
        'extract-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-import')(),
              require('postcss-preset-env')({
                /* use stage 3 features + css nesting rules */
                stage: 3,
                features: {
                  'nesting-rules': true,
                },
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
