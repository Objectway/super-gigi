var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = ['sass', 'jade'], function() {
  browserSync.init({
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
};
