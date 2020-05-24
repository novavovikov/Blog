const path = require('path')

const root = (...args) => path.join(__dirname, ...args)

const source = (...args) => root('src', ...args)
const styles = source('_styles')

const scripts = source('_scripts')
const output = (...args) => root('dist', ...args)

exports.root = root
exports.source = source
exports.output = output

exports.styles = styles
exports.scripts = scripts