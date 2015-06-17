var env = require('../env.js');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var typescript = require('gulp-typescript');



module.exports = function() {
  var sources = env.folder.src + '/scripts/**/*.ts';

  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(changed(sources))
    .pipe(typescript({
      module: 'amd',
      verbose: false,
      target: 'es5',
      fast: 'never',
      sourceMap: true,
      allowImportModule : true,
      out: 'main.js'
    }))
    .js.pipe(gulp.dest(env.folder.dev + '/scripts/'))
    .pipe(browserSync.reload({stream:true}));
};
