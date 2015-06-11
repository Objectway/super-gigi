//-----------------
// GULPFILE EXAMPLE
//-----------------

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var del = require('del');

// compile Sass and create the relative sourcemap
gulp.task('sass', function() {
    gulp.src('./src/assets/sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe($.changed('./src/assets/sass/**/*.sass'))
    .pipe($.sass()).on('error', $.util.log)
    .pipe(sourcemaps.write('../sourcemaps'))
    .pipe(gulp.dest('./development/css'))
    .pipe(browserSync.reload({stream:true}));
});


// compile Angular relative CoffeeScript
// gulp.task('controllers', function() {
//     gulp.src('./coffeescript/controllers#<{(|.coffee')
//     .pipe(sourcemaps.init())
//     .pipe($.changed('./coffeescript/controllers#<{(|.coffee'))
//     .pipe($.coffee({bare: true})).on('error', $.util.log)
//     .pipe($.concat('controllers.js'))
//     .pipe(sourcemaps.write('../maps'))
//     .pipe(gulp.dest('./js/'))
//     .pipe(browserSync.reload({stream:true}));
// });

// compile your custom plugins in CoffeeScript
// gulp.task('coffee-plugins', function() {
//     gulp.src('./p_coffeescript#<{(|.coffee')
//     .pipe(sourcemaps.init())
//     .pipe($.changed('./p_coffeescript#<{(|.coffee'))
//     .pipe($.coffee({bare: true})).on('error', $.util.log)
//     .pipe(sourcemaps.write('../../maps'))
//     .pipe(gulp.dest('./js/plugins/'))
//     .pipe(browserSync.reload({stream:true}));
// });

// Compile your less files
// gulp.task('less', function() {
//     gulp.src('./less/global.less')
//     .pipe(sourcemaps.init())
//     .pipe($.changed('./less#<{(||)}>#*.*'))
//     .pipe($.less()).on('error', $.util.log)
//     .pipe($.autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7", { cascade: true }))
//     .pipe($.rename('app.css'))
//     .pipe(sourcemaps.write('../maps'))
//     .pipe(gulp.dest('./css/'))
//     .pipe(filter('*|)}>#*.css'))
//     .pipe(browserSync.reload({stream:true}))
// });

// Clean the dist folder
gulp.task('clean', function(cb) {
   return del(['dist/*']);
});

// Minify and Uglify
gulp.task('minify', ['move'], function() {
  gulp.src('./development/css/main.css')
  .pipe($.minifyCss())
  .pipe(gulp.dest('./dist/css'));
  // gulp.src('./js/app.js')
  // .pipe($.uglify())
  // .pipe(gulp.dest('./dist/js/'))
});

// Move the needed files and folders into a dist folder which can be deployed to the webserver
gulp.task('move', ['clean'], function() {
  gulp.src(['./bower_components/**/*.*', './css/**/*.*', './js/**/*.*', './*.html', './assets/**/*.*', './.htaccess', './fonts/**/*.*'], { base: './' })
  .pipe(gulp.dest('dist'));
});

// browser-sync serve the work to
// your browser of choice
gulp.task('browser-sync', ['coffee', 'controllers', 'coffee-plugins', 'less'], function() {
  browserSync.init(['./*.html', './templates/*.html'], {
    server: {
      baseDir: "./"
    },
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: false
    }
  });
});



// Prepare the project after a
// Bootstrap submodule update

// Copy everything from Bootstrap to root JS folder
gulp.task('pre-prepare', function() {
  gulp.src(['./bower_components/bootstrap/js/**/*.*/'], {base: './bower_components/bootstrap/js'})
  .pipe(gulp.dest('js'));
  return pre;
});

// Copy fonts folder to the root project folder
// gulp.task('font-prepare', function() {
//   gulp.src(['./bower_components/bootstrap/fonts#<{(||)}>#*.|)}>#'], {base: './bower_components/bootstrap/fonts'})
//   .pipe(gulp.dest('fonts'));
// });

// Delete the tests folder from js
// and start pre-prepare/font-prepare tasks
gulp.task('prepare', ['pre-prepare', 'font-prepare']);

// FINAL TASKS
gulp.task('dist', ['minify']);

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('./coffeescript/*.coffee', ['coffee']);
  gulp.watch('./coffeescript/controllers/*.coffee', ["controllers"]);
  gulp.watch('./p_coffeescript/*.coffee', ['coffee-plugins']);
  gulp.watch('./less/*.less', ['less']);
});
