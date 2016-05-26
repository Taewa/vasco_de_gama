/* Plugin 
  ========================================================================== */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');




/* Setting & Properties
  ========================================================================== */
var paths = {
  sass: ['./scss/**/*.scss']
};




/* Gulp Default task
  ========================================================================== */
gulp.task('serve', ['sass', 'watch']);



/* Sass
  ========================================================================== */
gulp.task('sass', function(done) {
  gulp.src('./scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});










/* Watch
  ========================================================================== */
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});


