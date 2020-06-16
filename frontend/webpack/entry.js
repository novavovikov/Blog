const glob = require('glob')
const path = require('path')
const { scriptsSource } = require('../paths')

const sourceFiles = path.join(scriptsSource, '*.{ts,tsx}')

module.exports = (env) => glob.sync(sourceFiles).
  reduce((acc, filePath) => {
    const { name } = path.parse(filePath)
    return {
      ...acc,
      [name]: filePath,
    }
  }, {})