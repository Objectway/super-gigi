var vfs = require('vinyl-fs');
var converter = require('sass-convert');

vfs.src('./src/assets/styles/**/*.sass')
  .pipe(converter({
    from: 'sass',
    to: 'scss',
    rename: 'scss'
  }))
  .pipe(vfs.dest('./src/assets/styles/converted'));
