var gulp = require('gulp');
var browserSync = require('browser-sync');
var sprity = require('sprity');
var gulpif = require('gulp-if');

module.exports = function () {
  return sprity.src({
    src: './src/assets/sprites/**/*.{png,jpg}',
    style: './sprite.css',
    processor: 'sass',
  })
  .pipe(gulpif('*.png', gulp.dest('./development/sprites/'), gulp.dest('./dist/css/')))
};
