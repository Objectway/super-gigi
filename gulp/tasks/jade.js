var env = require('../env.js');
var gulp = require('gulp');
var jade = require('gulp-jade');
var changed = require('gulp-changed');
var util = require('gulp-util');



module.exports = function() {
  return gulp.src(env.folder.src + '/views/*.jade')
    .pipe(changed(env.folder.dev))
    .pipe(jade({
      basedir: 'node_modules/',
      pretty: true
    }))
    .on('error', function (err) {
      util.log(err.message);
      this.emit('end');
    })
    .pipe(gulp.dest(env.folder.dev));
};
