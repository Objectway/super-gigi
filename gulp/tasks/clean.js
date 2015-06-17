var env     = require('../env.js'),
    gulp    = require('gulp'),
    del     = require('del');

module.exports = function() {
   return del([env.distDir]);
};

