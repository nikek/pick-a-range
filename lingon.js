#!/usr/bin/env node

var lingon        = require('lingon');
var autoprefixer  = require('gulp-autoprefixer');

// cross browser css. adds vendor prefixes as needed. https://github.com/sindresorhus/gulp-autoprefixer
lingon.postProcessors.push('less', function() {
  return autoprefixer();
});