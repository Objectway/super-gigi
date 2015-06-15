var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

module.exports = function() {
    gulp.src('./src/assets/sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe($.changed('./src/assets/sass/**/*.sass'))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', { cascade: true }))
    .pipe(sourcemaps.write('../sourcemaps'))
    .pipe(gulp.dest('./development/css'))
    .pipe(browserSync.reload({stream:true}));
};
