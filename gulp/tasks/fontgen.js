var env         = require('../env.js'),
    gulp        = require('gulp'),
    fontgen     = require('gulp-fontgen');

module.exports = function () {
  return gulp.src(env.srcDir + '/styles/fonts/*.{otf,ttf}')
    .pipe(fontgen({
      dest: env.srcDir + '/styles/fonts/'
    }))
};
