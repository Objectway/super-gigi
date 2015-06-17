var gulp = require('gulp'),
    env  = require('../env.js');

module.exports = function () {
  gulp.watch(env.srcDir + '/styles/**/*.sass', ['style']);
  gulp.watch(env.srcDir + '/views/**/*.jade', ['view']);
  gulp.watch(env.srcDir + '/scripts/**/*.ts', ['script']);
};
