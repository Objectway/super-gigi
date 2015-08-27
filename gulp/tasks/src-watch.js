var env = require('../env.js');
var gulp = require('gulp');
var watch = require('gulp-watch');



module.exports = function () {
  watch(env.folder.src + '/devStyles/**/*.s[ac]ss', env.loadTask('sass'));
  watch(env.folder.src + '/views/**/*.jade', env.loadTask('jade'));
  watch(env.folder.src + '/scripts/**/*.ts', env.loadTask('typescript'));
};
