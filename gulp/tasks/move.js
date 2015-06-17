var env     = require('../env.js'),
    gulp    = require('gulp');

module.exports = function() {
  var move = gulp.src([env.devDir + '/**/*', '!' + env.devDir + '/sourcemaps/', '!' + env.devDir + '/sourcemaps/**'], { base: env.devDir })
    .pipe(gulp.dest(env.distDir));
  return move;
};
