var env = require('../env.js');
var gulp = require('gulp');

var autoprefixer = require('autoprefixer-core');
var changed = require('gulp-changed');
var cssPrefix = require('gulp-css-prefix');
var gulpif = require('gulp-if');
var mqpacker = require('css-mqpacker');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');


module.exports = function() {
  return gulp.src(env.folder.src + '/devStyles/*.+(sass|scss)')
    .pipe(sourcemaps.init())
    .pipe(changed(env.folder.dev + '/devStyles/'))
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
    .pipe(
      postcss([
        autoprefixer({
          browsers: env.compatibility,
          cascade: true
        }),
        mqpacker({
          sort: true
        })
      ])
    )
    .pipe(sourcemaps.write('../sourcemaps'))
    .pipe(gulp.dest(env.folder.dev + '/styles/'));
};
