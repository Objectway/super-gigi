// *****************************************************************
// USEFUL TASKS
// $ gulp dist -> Compile the distribution folder
// $ gulp compile -> Compile the development files
// $ gulp default -> Compile and start a local webserver + watcher
// $ gulp serve -> Just serve the local webserver
// *****************************************************************


var env         = require('./gulp/env.js'),
    gulp        = require('gulp');


// BASE SINGLE TASKS
gulp.task('style', require(env.tasksDir + '/sass.js'));
gulp.task('view', require(env.tasksDir + '/jade.js'));
gulp.task('sprite', require(env.tasksDir + '/sprites.js'));
gulp.task('script', require(env.tasksDir + '/typescript.js'));
gulp.task('font', require(env.tasksDir + '/fontgen.js'));
gulp.task('iconfont', require(env.tasksDir + '/iconfont.js'));
gulp.task('srcWatch', require(env.tasksDir + '/src-watch.js'));
gulp.task('clean', require(env.tasksDir + '/clean.js'));
gulp.task('minify', ['move'], require(env.tasksDir + '/minify.js'));
gulp.task('move', require(env.tasksDir + '/move.js'));


// USEFUL TASKS
gulp.task('dist', ['clean', 'minify']);
gulp.task('compile', ['style', 'view', 'script']);
gulp.task('default', ['compile', 'srcWatch'], require(env.tasksDir + '/browser-sync.js'));
gulp.task('serve', require(env.tasksDir + '/browser-sync.js'));
