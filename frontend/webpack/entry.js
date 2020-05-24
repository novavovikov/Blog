const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const paths = require('../paths')

function getImports ({ src, output }) {
  try {
    const files = fs.readdirSync(src) || []

    return files.reduce((acc, file) => {
      const filePath = path.join(src, file)
      const statFile = fs.statSync(filePath)

      if (statFile.isDirectory()) {
        return acc
      }

      const name = path.parse(file).name
      return {
        ...acc,
        [name]: {
          import: filePath,
          filename: output,
        },
      }
    }, {})
  } catch (e) {
    console.log(chalk.cyan('getImports: '), chalk.red(e))
    return {}
  }
}

module.exports = (env) => {
  const styleFiles = getImports({
    src: paths.styles,
    output: './_temp/[name]',
  })

  const scriptFiles = getImports({
    src: paths.scripts,
    output: './scripts/[name].js',
  })

  return {
    ...styleFiles,
    ...scriptFiles,
  }
}