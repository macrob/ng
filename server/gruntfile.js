
const util = require('./.grunt/main');

module.exports = function(grunt) {
  


  // Project configuration.
  grunt.initConfig({
    clean: util.inject('clean'),
    ts: util.inject('ts'),
    watch: util.inject('watch'),
    express: util.inject('express'),
  });


  // Default task(s).
  grunt.registerTask('default', ['clean:app', 'ts:app', 'express:dev','watch']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-express-server');
};

