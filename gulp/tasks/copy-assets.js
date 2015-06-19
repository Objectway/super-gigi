var env = require('../env.js');
var gulp = require('gulp');



module.exports = function() {
  gulp.src(env.folder.src + '/images/**/*')
    .pipe(gulp.dest(env.folder.dev + '/images'));
  gulp.src(env.folder.src + '/styles/fonts/**/*')
    .pipe(gulp.dest(env.folder.dev + '/styles/fonts'));
};

