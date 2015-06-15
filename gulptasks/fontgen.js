var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

module.exports = function () {
  gulp.src('./src/assets/fonts/*.*')
    .pipe($.fontgen({
      dest: './src/assets/fonts/'
    }))
};
