// *****************************************************************
// USEFUL TASKS
// $ gulp dist -> Compile the distribution folder
// $ gulp compile -> Compile the development files
// $ gulp default -> Compile and start a local webserver + watcher
// $ gulp serve -> Just serve the local webserver
// *****************************************************************


var env = require('./gulp/env.js');
var gulp = require('gulp');


// BASE SINGLE TASKS
gulp.task('style', require(env.folder.tasks + '/sass.js'));
gulp.task('view', require(env.folder.tasks + '/jade.js'));
gulp.task('sprite', require(env.folder.tasks + '/sprites.js'));
gulp.task('script', require(env.folder.tasks + '/typescript.js'));
gulp.task('font', require(env.folder.tasks + '/fontgen.js'));
gulp.task('iconfont', require(env.folder.tasks + '/iconfont.js'));
gulp.task('srcWatch', require(env.folder.tasks + '/src-watch.js'));
gulp.task('clean', require(env.folder.tasks + '/clean.js'));
gulp.task('minify', ['move'], require(env.folder.tasks + '/minify.js'));
gulp.task('move', require(env.folder.tasks + '/move.js'));


// USEFUL TASKS
gulp.task('dist', ['clean', 'minify']);
gulp.task('compile', ['style', 'view', 'script']);
gulp.task(
  'default',
  ['compile', 'srcWatch'],
  require(env.folder.tasks + '/browser-sync.js')
);
gulp.task('serve', require(env.folder.tasks + '/browser-sync.js'));
