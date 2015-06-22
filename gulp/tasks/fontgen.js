var env = require('../env.js');
var gulp = require('gulp');
var fontgen = require('gulp-fontgen');



module.exports = function () {
  return gulp.src(env.folder.src + '/styles/fonts/*.{otf,ttf}')
    .pipe(fontgen({
      css_fontpath: 'fonts/',
      dest: env.folder.src + '/styles/fonts/'
    }));
};
