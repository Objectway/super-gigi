var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

module.exports = ['move'], function() {
  gulp.src('./dist/css/main.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('./dist/css/'));
  gulp.src('./dist/js/main.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/js/'))
};
