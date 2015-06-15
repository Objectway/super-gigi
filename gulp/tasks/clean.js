var gulp = require('gulp');
var del = require('del');

module.exports = function(cb) {
   return del(['./dist/*'], cb);
};

