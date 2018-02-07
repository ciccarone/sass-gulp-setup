var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');


// Define sass & css paths
var sassOrigin = 'sass/**/*.scss',
    cssDest = 'css/';


// Export sass to css and minify
gulp.task('styles', function() {
  gulp.src(sassOrigin)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
    .pipe(minifyCss())
    .pipe(concat('style.css'))
    .pipe(rename({
      basename : 'style',
      extname : '.min.css'
    }))
    .pipe(gulp.dest(cssDest));
});

// General watch task
gulp.task('watch',function() {
  gulp.watch(sassOrigin,['styles']);
});


gulp.task('default', function(callback) {
  runSequence(
    'styles',
    'watch',
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      callback(error);
    });
});
