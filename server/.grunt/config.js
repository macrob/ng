const grunt = require('grunt');
const path = require('path');

const package = grunt.file.readJSON('package.json');


module.exports = {
  dest: path.resolve(__dirname, '..', package.build),
  src: path.resolve(__dirname, '..', package.src),
  main: path.resolve(__dirname, '..', package.main),

  frontend: path.resolve(__dirname, '..', package.frontend)
};