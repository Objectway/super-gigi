var env = require('../env.js');
var gulp = require('gulp');
var jade = require('gulp-jade');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');



module.exports = function() {
  return gulp.src(env.folder.src + '/views/*.jade')
    .pipe(changed(env.folder.src + '/views/**/*.jade'))
    .pipe(jade({
      basedir: 'node_modules/',
      pretty: true
    }))
    .pipe(gulp.dest(env.folder.dev))
    .pipe(browserSync.reload({stream: true}));
};
