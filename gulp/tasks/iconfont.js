var env = require('../env.js');
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontcss = require('gulp-iconfont-css');
var consolidate = require('gulp-consolidate');



module.exports = function() {
  var fontName = 'owFont';
  var className = 'owIcon';

  gulp.src([env.folder.src + '/styles/icons/svgs/*.svg'])
    .pipe(iconfont({
      className: className,
      appendCodepoints: true,
      fontName: 'owFont',
      appendUnicode: true
    }))
    .on('glyphs', function(glyphs, options) {
      for(i = 0; i < glyphs.length; i++){
        glyphs[i].codepoint = 0xEA01 + i;
      }
      gulp.src([env.folder.src + '/styles/icons/template/iconsViewer.html'])
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className
        }))
        .pipe(gulp.dest(env.folder.src + '/styles/icons/dev/'));

      gulp.src(env.folder.src + '/styles/icons/template/iconsViewer.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className,
          fontPath: '../fonts/'
        }))
        .pipe(gulp.dest(env.folder.src + '/styles/icons/dev/'));

      gulp.src(env.folder.src + '/styles/icons/template/iconsViewer.scss')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className,
          fontPath: '../fonts/'
        }))
        .pipe(gulp.dest(env.folder.src + '/styles/icons/dev/'));
    })
    .pipe(gulp.dest(env.folder.src + '/styles/icons/fonts/'));
};
