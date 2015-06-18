var gulp = require('gulp');

 module.exports = ['browser-sync'], function () {
  gulp.watch('./src/assets/sass/**/*.sass', ['sass']);
  gulp.watch('./src/assets/jade/**/*.jade', ['jade']);
  gulp.watch('./src/assets/ts/**/*.ts', ['typescript']);
};
