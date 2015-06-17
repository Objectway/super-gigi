var env = require('../env.js');
var gulp = require('gulp');
var del = require('del');



module.exports = function() {
   return del([env.folder.dist]);
};

