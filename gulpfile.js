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
gulp.task('style', env.loadTask('sass'));
gulp.task('view', env.loadTask('jade'));
gulp.task('sprite', env.loadTask('sprites'));
gulp.task('script', env.loadTask('typescript'));
//gulp.task('font', env.loadTask('fontgen'));
//gulp.task('iconfont', env.loadTask('iconfont'));
gulp.task('srcWatch', env.loadTask('src-watch'));
gulp.task('clean', env.loadTask('clean'));
gulp.task('minify', env.loadTask('minify'));
gulp.task('move', env.loadTask('move'));
gulp.task('copy', env.loadTask('copy-assets'));
gulp.task('compress', env.loadTask('compress'));


// USEFUL TASKS
gulp.task('compile', ['style', 'view', 'script']);
gulp.task('default', ['compile', 'srcWatch', 'copy'], env.loadTask('browser-sync'));
gulp.task('serve', ['srcWatch'], env.loadTask('browser-sync'));
