const gulp = require('gulp')
const gcmq = require('gulp-group-css-media-queries')
// const csso = require('gulp-csso')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const debug = require('gulp-debug')
const deepImport = require('gulp-css-deep-import')
const ifEnv = require('gulp-if-env')
const postcss = require('gulp-postcss')
const postcssImports = require('postcss-import')
const postcssNested = require('postcss-nested')
const postcssApply = require('postcss-apply')
const postcssPresetEnv = require('postcss-preset-env')

gulp.task('styles', () => {
  const plugins = [
    postcssImports,
    postcssApply,
    postcssNested,
    postcssPresetEnv({
      stage: 2,
    }),
  ]

  return gulp.src('src/styles/*.css').
    pipe(plumber({ errorHandler: notify.onError() })).
    pipe(deepImport()).
    pipe(postcss(plugins)).
    pipe(ifEnv('production', gcmq()))
    // .pipe(ifEnv('production', csso()))
    .pipe(debug({ title: 'styles:' })).
    pipe(gulp.dest('dist/styles'))
})
