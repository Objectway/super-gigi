var env = require('../env.js');
var gulp = require('gulp');
var sprite = require('gulp.spritesmith');
var gulpif = require('gulp-if');



module.exports = function () {
  var sources = [
    env.folder.src + '/images/**/*.png',
    '!' + env.folder.src + '/images/sprites/*.png'
  ];

  return gulp.src(sources)
    .pipe(sprite({
      imgName: 'sprite.png',
      cssName: '_sprites.sass',
      algorithm: 'binary-tree',
      algorithmOpts: { sort: false },
      cssSpritesheetName: 'images',
      // Retina images
      retinaSrcFilter: env.folder.src + '/images/**/*2x.png',
      retinaImgName: 'sprite@2x.png'
    }))
    .pipe(gulpif(
      '*.png',
      gulp.dest(env.folder.src + '/images/sprites/'),
      gulp.dest(env.folder.src + '/styles/sprites/'))
    );
};
