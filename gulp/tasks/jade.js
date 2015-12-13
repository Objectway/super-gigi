var env = require('../env.js');
var gulp = require('gulp');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var markdown = require("marked");
var changed = require('gulp-changed');
var util = require('gulp-util');
var fs = require("fs");

var parseString = function (strToParse, strStart, strFinish) {
    var regExp = new RegExp(strStart + '[\\\s\\\S]*?(' + strFinish + ')');
    return strToParse.match(regExp);
}

jade.filters.readmeBlock = function(id) {
  var fileText = fs.readFileSync("README.md", "utf-8");
  var str = parseString(fileText, '\\\#\\\#\\\#(.*)' + id, "\\\#\\\#\\\#");
  if(str != null) {
    var finalString = str[0].slice(0, -5)
    return markdown(finalString);
  } else{
    return "Block not found!"
  }
}

jade.filters.readmeSection = function(id) {
  var fileText = fs.readFileSync("README.md", "utf-8");
  var str = parseString(fileText, '##(.*)' + id, "\\\s##\\\s");
  if(str != null) {
    var finalString = str[0].slice(0, -5)
    return markdown(finalString);
  } else{
    console.log("Section not found!");
    return "Section not found!"
  }
}



module.exports = function() {
  return gulp.src(env.folder.src + '/views/*.jade')
    .pipe(changed(env.folder.dev))
    .pipe(gulpJade({
      jade: jade,
      basedir: 'node_modules/',
      pretty: true
    }))
    .on('error', function (err) {
      util.log(err.message);
      this.emit('end');
    })
    .pipe(gulp.dest('./'));
};
