const path = require('path')

const root = __dirname
const source = path.join(root, 'src')
const output = path.join(root, 'dist')

const tsConfig = path.join(root, 'tsconfig.json')

const scriptsSource = path.join(source, 'scripts')
const scriptsOutput = path.join(output, 'scripts')

module.exports = {
  root,
  source,
  output,
  tsConfig,
  scriptsSource,
  scriptsOutput,
}