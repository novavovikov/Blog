const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const newer = require('gulp-newer')
const debug = require('gulp-debug')
const imagemin = require('gulp-imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminSvgo = require('imagemin-svgo')
const ifEnv = require('gulp-if-env')

gulp.task('images', function () {
  return gulp.src(
    'src/{images,icons}/*.{jpg,jpeg,png,svg}',
    { since: gulp.lastRun('images') },
  ).
    pipe(plumber({ errorHandler: notify.onError() })).
    pipe(newer('dist')).
    pipe(
      ifEnv('production',
        imagemin([
          imageminMozjpeg(),
          imageminSvgo({
            plugins: [
              { removeViewBox: false },
            ],
          }),
        ])),
    ).
    pipe(debug({ title: 'image:' })).
    pipe(gulp.dest('dist'))
})
