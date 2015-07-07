var env = require('../env.js');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');



module.exports = function() {
  gulp.src(env.folder.dist + '/styles/main.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(env.folder.dist + '/styles/'));

  gulp.src(env.folder.dist + '/scripts/main.js')
    .pipe(uglify())
    .pipe(gulp.dest(env.folder.dist + '/scripts/'));
};
