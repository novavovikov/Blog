const gulp = require('gulp')

//images
gulp.task('watch:images', () => {
  gulp.watch('src/{images,icons}/**/*.{jpg,jpeg,png,svg}', gulp.series('images'))
})

//resources
gulp.task('watch:resources', () => {
  gulp.watch('src/resources/**/*.*', gulp.series('resources'))
})

//scripts
gulp.task('watch:scripts', () => {
  gulp.watch([
    'src/scripts/**/*.{ts,tsx,css}',
  ], gulp.series('scripts'))
})

//styles
gulp.task('watch:styles', () => {
  gulp.watch([
    'src/styles/**/*.css',
  ], gulp.series('styles'))
})
