const gulp = require('gulp')
const compiler = require('webpack')
const webpack = require('webpack-stream')
const webpackConfig = require('../webpack.config.js')
const plumber = require('gulp-plumber')
const named = require('vinyl-named')
const notify = require('gulp-notify')
const debug = require('gulp-debug')

gulp.task('scripts', () => {
  return gulp.src('src/scripts/*.{ts,tsx}').
    pipe(plumber({ errorHandler: notify.onError() })).
    pipe(named()).
    pipe(webpack(
      { config: webpackConfig('development') },
      compiler,
    )).
    pipe(debug({ title: 'scripts:' })).
    pipe(gulp.dest('dist/scripts'))
})

