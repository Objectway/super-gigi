var env         = require('../env.js'),
    gulp        = require('gulp'),
    sprite      = require('gulp.spritesmith'),
    gulpif      = require('gulp-if');

module.exports = function () {
  spriteData = gulp.src([env.srcDir + '/images/**/*.png', '!' + env.srcDir + '/images/sprites/*.png'])
    .pipe(sprite({
      imgName: 'sprite.png',
      cssName: 'sprites.sass',
      algorithm: 'binary-tree',
      algorithmOpts: {
        sort: false
      },
      cssSpritesheetName: 'images',

      // Retina images
      retinaSrcFilter: env.srcDir + '/images/**/*2x.png',
      retinaImgName: 'sprite@2x.png'
    })
  )
    .pipe(gulpif('*.png', gulp.dest(env.srcDir + '/images/sprites/'), gulp.dest(env.srcDir + '/sass/sprites/')));
};
