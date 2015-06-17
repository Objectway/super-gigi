var env       = require('../env.js'),
    gulp      = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    uglify    = require('gulp-uglify');

module.exports = function() {
  gulp.src(env.distDir + '/styles/main.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(env.distDir + '/styles/'));
  gulp.src(env.distDir + '/scripts/main.js')
    .pipe(uglify())
    .pipe(gulp.dest(env.distDir + '/scripts/'));
};
