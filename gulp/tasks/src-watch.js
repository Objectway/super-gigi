var env = require('../env.js');
var gulp = require('gulp');



module.exports = function () {
  gulp.watch(env.folder.src + '/styles/**/*.sass', ['style']);
  gulp.watch(env.folder.src + '/views/**/*.jade', ['view']);
  gulp.watch(env.folder.src + '/scripts/**/*.ts', ['script']);
};
