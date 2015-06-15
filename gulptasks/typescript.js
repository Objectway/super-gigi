var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var del = require('del');

module.exports = function () {
  var tsResult = gulp.src('./src/assets/ts/**/*.ts')
    .pipe($.typescript({
        module: 'amd',
        verbose: false,
        target: 'es5',
        fast: 'never',
        sourceMap: false,
        allowImportModule : true,
        out: 'main.js'
      }));
  return tsResult.js.pipe(gulp.dest('./development/js'));
};
