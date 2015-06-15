// UI-TOOLKIT GULPFILE

var gulp = require('gulp');
var browserSync = require('browser-sync');

// BROWSER SYNC MAIN TASK
gulp.task('browser-sync', ['sass', 'jade'], function() {
  browserSync.init(['./src/jade/**/*.jade'], {
    open: false,
    server: {
      baseDir: "./development"
    },
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: false
    }
  });
});

// SPLITTED TASKS
gulp.task('dist', ['minify']);
gulp.task('sass', require('./gulptasks/sass.js'));
gulp.task('jade', require('./gulptasks/jade.js'));
gulp.task('sprites', require('./gulptasks/sprites.js'));
gulp.task('typescript', require('./gulptasks/typescript.js'));
gulp.task('fontgen', require('./gulptasks/fontgen.js'));
gulp.task('clean', require('./gulptasks/clean.js'));
gulp.task('dist', require('./gulptasks/minify.js'));
gulp.task('move', require('./gulptasks/move.js'));
// gulp.task('browser-sync', require('./gulptasks/browser-sync.js'));
gulp.task('default', require('./gulptasks/default.js'));
