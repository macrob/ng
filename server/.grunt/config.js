const grunt = require('grunt');
const path = require('path');
// const dotenv = require('dotenv');

const package = grunt.file.readJSON('package.json');

// dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });
require('./setenv');


module.exports = {
  dest: path.resolve(__dirname, '..', package.build),
  src: path.resolve(__dirname, '..', package.src),
  main: path.resolve(__dirname, '..', package.main),

  frontend: path.resolve(__dirname, '..', package.frontend)
};