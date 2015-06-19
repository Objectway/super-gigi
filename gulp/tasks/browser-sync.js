var env = require('../env.js');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();



module.exports = function() {
  browserSync.init({
    open: false,
    notify: false,
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

  gulp
    .watch(env.folder.dev + "/styles/main.css")
    .on('change', browserSync.reload);
  gulp
    .watch(env.folder.dev + "/scripts/main.js")
    .on('change', browserSync.reload);
  gulp
    .watch(env.folder.dev + "/**/*.html")
    .on('change', browserSync.reload);
};
