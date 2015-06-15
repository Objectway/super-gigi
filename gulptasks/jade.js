var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

module.exports = function() {
  gulp.src('./src/assets/jade/*.jade')
  .pipe($.changed('./src/assets/jade/**/*.jade'))
  .pipe($.jade({ pretty: true }))
  .pipe(gulp.dest('./development/'))
  .pipe(browserSync.reload({stream: true}))
};
