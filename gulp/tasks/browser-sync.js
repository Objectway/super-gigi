var env = require('../env.js');
var gulp = require('gulp');
var bs = require('browser-sync').create();



module.exports = function() {
  bs.init({
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

  bs.watch(env.folder.dev + "/styles/*.css").on("change", bs.reload);
  bs.watch(env.folder.dev + "/scripts/*.js").on('change', bs.reload);
  bs.watch(env.folder.dev + "/**/*.html").on('change', bs.reload);
};
