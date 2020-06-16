const gulp = require('gulp')
const del = require('del')

require('./tasks/images')
require('./tasks/resources')
require('./tasks/styles')
require('./tasks/watch')
require('./tasks/webserver')

//Main tasks ------------------------------------------
gulp.task('clean', () => {
  return del('dist')
})

gulp.task('build', gulp.series(
  gulp.parallel(
    'images',
    'resources',
    'styles',
  )),
)

gulp.task('prod', gulp.series(
  'clean',
  'build',
))

gulp.task('dev', gulp.series(
  'build',
  gulp.parallel(
    'watch:images',
    'watch:resources',
    'watch:scripts',
    'watch:styles',
    'webserver',
  ),
))
