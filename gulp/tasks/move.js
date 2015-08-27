var env = require('../env.js');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();



module.exports = function() {
  gulp.src(env.folder.dev + '/styles/**/*.*')
    .pipe(gulp.dest(env.folder.dist));
  gulp.src([
    env.folder.src + '/styles/**/*.*',
    "!" + env.folder.src + '/styles/supergigi.scss',
    "!" + env.folder.src + '/styles/old-sass/**/*.*'
  ])
    .pipe(gulp.dest(env.folder.dist));
};
