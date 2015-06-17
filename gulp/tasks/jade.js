var env         = require('../env.js'),
    gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    changed     = require('gulp-changed'),
    jade        = require('gulp-jade');

module.exports = function() {
  return gulp.src(env.srcDir + '/views/*.jade')
  .pipe(changed(env.srcDir + '/views/**/*.jade'))
  .pipe(jade({ pretty: true }))
  .pipe(gulp.dest(env.devDir))
  .pipe(browserSync.reload({stream: true}));
};
