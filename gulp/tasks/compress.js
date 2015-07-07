var env = require('../env.js');
var gulp = require('gulp');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var dateFormat = require('dateformat');
// var revision = require('git-rev-sync')



module.exports = function () {
  return gulp.src(env.folder.dist + '/**/*')
    // .pipe(tar(revision.short() + '-build.tar'))
    .pipe(tar(dateFormat(new Date(), "yyyymmdd-HHMM") + '-build.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('./'));
};
