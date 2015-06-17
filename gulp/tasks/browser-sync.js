var env         = require('../env.js'),
    gulp        = require('gulp'),
    browserSync = require('browser-sync').create();

module.exports = function() {
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
};
