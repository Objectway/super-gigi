var env = require('../env.js');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();



module.exports = function() {
  var sources = [
    env.folder.dev + '/**/*',
    '!' + env.folder.dev + '/sourcemaps/',
    '!' + env.folder.dev + '/sourcemaps/**'
  ];

  return gulp.src(sources, { base: env.folder.dev })
    .pipe(gulp.dest(env.folder.dist));
};
