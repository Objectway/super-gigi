// UI-TOOLKIT GULPFILE
var env         = require('./gulp/env.js'),
    browserSync = require('browser-sync'),
    gulp        = require('gulp');

// BROWSER SYNC MAIN TASK
gulp.task('browser-sync', ['style', 'view'], function() {
  browserSync.init({
    open: false,
    server: {
      baseDir: env.devDir
    },
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: false
    }
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(env.srcDir + 'sass/**/*.sass', ['sass']);
  gulp.watch(env.srcDir + 'jade/**/*.jade', ['jade']);
  gulp.watch(env.srcDir + 'ts/**/*.ts', ['typescript']);
});

// SPLITTED TASKS
gulp.task('style', require(env.tasksDir + '/sass.js'));
gulp.task('view', require(env.tasksDir + '/jade.js'));
gulp.task('sprite', require(env.tasksDir + '/sprites.js'));
gulp.task('script', require(env.tasksDir + '/typescript.js'));
gulp.task('font', require(env.tasksDir + '/fontgen.js'));
gulp.task('iconfont', require(env.tasksDir + '/iconfont.js'));

gulp.task('clean', require(env.tasksDir + '/clean.js'));
gulp.task('dist', require(env.tasksDir + '/minify.js'));
gulp.task('move', require(env.tasksDir + '/move.js'));



// gulp.task('browser-sync', require('./gulptasks/browser-sync.js'));
// gulp.task('default', require('./gulptasks/default.js'));
