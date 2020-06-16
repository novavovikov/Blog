const gulp = require('gulp')
const debug = require('gulp-debug')

const EXCLUDED_FOLDERS = 'scripts,styles,images,icons'

gulp.task('resources', () => {
  return gulp.src([
    'src/**/*.*',
    `!src/{${EXCLUDED_FOLDERS}}/**/*.*`,
  ], { since: gulp.lastRun('resources') }).
    pipe(debug({ title: 'resources:' })).
    pipe(gulp.dest('dist/'))
})
