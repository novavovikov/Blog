const gulp = require('gulp')
const browserSync = require('browser-sync')

const bs = browserSync.create()

gulp.task('webserver', () => {
  bs.init({
    open: false,
    proxy: {
      target: 'http://backend:5000',
    },
  })
  bs.watch('dist/**/*').on('change', bs.reload)
})
