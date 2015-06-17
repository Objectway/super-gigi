var env         = require('../env.js'),
    gulp        = require('gulp'),
    iconfont    = require('gulp-iconfont'),
    iconfontcss = require('gulp-iconfont-css'),
    consolidate = require('gulp-consolidate');

module.exports = function() {
  var fontName = 'owFont',
      className = 'owIcon';
  gulp.src([env.srcDir + '/styles/icons/svgs/*.svg'])
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
      gulp.src([env.srcDir + '/styles/icons/template/iconsViewer.html'])
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className
        }))
        .pipe(gulp.dest(env.srcDir + '/styles/icons/dev/'));

      gulp.src(env.srcDir + '/styles/icons/template/iconsViewer.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className,
          fontPath: '../fonts/'
        }))
        .pipe(gulp.dest(env.srcDir + '/styles/icons/dev/'));

      gulp.src(env.srcDir + '/styles/icons/template/iconsViewer.scss')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: className,
          fontPath: '../fonts/'
        }))
        .pipe(gulp.dest(env.srcDir + '/styles/icons/dev/'));
    })
    .pipe(gulp.dest(env.srcDir + '/styles/icons/fonts/'));
};
