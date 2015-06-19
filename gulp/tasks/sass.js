var env = require('../env.js');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');
var cssPrefix = require('gulp-css-prefix');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var util = require('gulp-util');



module.exports = function() {
  return gulp.src(env.folder.src + '/styles/main.sass')
    .pipe(sourcemaps.init())
    .pipe(changed(env.folder.src + '/styles/**/*.sass'))
    .pipe(sass({
      includePaths: ['./node_modules/']
    }))
    .on('error', function (err) {
      util.log(err.message);
      this.emit('end');
    })
    .pipe(gulpif(
      env.namespaceCSS,
      cssPrefix({'parentClass': env.namespaceCSS})
    ))
    .pipe(autoprefixer({
      browsers: env.compatibility,
      cascade: true
    }))
    .pipe(sourcemaps.write('../sourcemaps'))
    .pipe(gulp.dest(env.folder.dev + '/styles/'));
};
