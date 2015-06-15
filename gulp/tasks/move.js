var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = ['clean'], function() {
  gulp.src(['./development/**/*', '!./development/sourcemaps/**/*'], { base: './development' })
  .pipe(gulp.dest('./dist'));
};
