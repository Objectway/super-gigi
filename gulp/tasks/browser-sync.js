var env = require('../env.js');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();



module.exports = function() {
  browserSync.init({
    open: false,
    server: {
      baseDir: env.folder.dev
    },
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: false
    }
  });
};
