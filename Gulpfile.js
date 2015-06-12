//***********
// GULPFILE *
//***********

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var del = require('del');

// Compile Sass and create the relative sourcemap
gulp.task('sass', function() {
    gulp.src('./src/assets/sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe($.changed('./src/assets/sass/**/*.sass'))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', { cascade: true }))
    .pipe(sourcemaps.write('../sourcemaps'))
    .pipe(gulp.dest('./development/css'))
    .pipe(browserSync.reload({stream:true}));
});

// Compile Jade
gulp.task('jade', function() {
  gulp.src('./src/assets/jade/*.jade')
  .pipe($.changed('./src/assets/jade/**/*.jade'))
  .pipe($.jade({ pretty: true }))
  .pipe(gulp.dest('./development/'))
  .pipe(browserSync.reload({stream: true}))
});

// Typescript
gulp.task('typescript', function () {
  var tsResult = gulp.src('./src/assets/ts/**/*.ts')
    .pipe($.typescript({
        module: 'amd',
        verbose: false,
        target: 'es5',
        fast: 'never',
        sourceMap: false,
        allowImportModule : true,
        out: 'main.js'
      }));
  return tsResult.js.pipe(gulp.dest('./development/js'));
});


// Fonts task with "fontgen"
gulp.task('fontgen', function () {
  gulp.src('./src/assets/fonts/*.*')
    .pipe($.fontgen({
      dest: './src/assets/fonts/'
    }))
});

// Clean the dist folder
gulp.task('clean', function(cb) {
   return del(['./dist/*'], cb);
});

// Minify and Uglify the dist folder files
gulp.task('minify', ['move'], function() {
  gulp.src('./dist/css/main.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('./dist/css/'));
  gulp.src('./dist/js/main.js')
  .pipe($.uglify())
  .pipe(gulp.dest('./dist/js/'))
});

// Move the needed files and folders
// into a dist folder which can be deployed
gulp.task('move', ['clean'], function() {
  gulp.src(['./development/**/*', '!./development/sourcemaps/**/*'], { base: './development' })
  .pipe(gulp.dest('./dist'));
});

// browser-sync serve the work to
// your browser of choice
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



//**************
// FINAL TASKS *
//**************

gulp.task('dist', ['minify']);

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('./src/assets/sass/**/*.sass', ['sass']);
  gulp.watch('./src/assets/jade/**/*.jade', ['jade']);
  gulp.watch('./src/assets/ts/**/*.ts', ['typescript']);
});
