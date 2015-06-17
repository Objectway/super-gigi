var env         = require('../env.js'),
    gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sourcemaps  = require('gulp-sourcemaps'),
    changed     = require('gulp-changed'),
    typescript  = require('gulp-typescript');

module.exports = function() {
  return gulp.src(env.srcDir + '/scripts/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(changed(env.srcDir + '/scripts/**/*.ts'))
    .pipe(typescript({
      module: 'amd',
      verbose: false,
      target: 'es5',
      fast: 'never',
      sourceMap: true,
      allowImportModule : true,
      out: 'main.js'
    }))
    .js.pipe(gulp.dest(env.devDir + '/scripts/'))
    .pipe(browserSync.reload({stream:true}));
};
