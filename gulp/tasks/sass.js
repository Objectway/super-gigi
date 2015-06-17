var env          = require('../env.js'),
    gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps'),
    changed      = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    cssPrefix    = require('gulp-css-prefix'),
    sass         = require('gulp-sass');

module.exports = function() {
  return gulp.src(env.srcDir + '/styles/main.sass')
    .pipe(sourcemaps.init())
    .pipe(changed(env.srcDir + '/styles/**/*.sass'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssPrefix({'parentClass': env.namespaceCSS}))
    .pipe(autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', { cascade: true }))
    .pipe(sourcemaps.write('../sourcemaps'))
    .pipe(gulp.dest(env.devDir + '/styles/'))
    .pipe(browserSync.reload({stream:true}));
};
