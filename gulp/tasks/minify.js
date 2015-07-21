var env = require('../env.js');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');



module.exports = function() {
  gulp.src(env.folder.dist + '/supergigi.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(env.folder.dist + '/min/'));
};
