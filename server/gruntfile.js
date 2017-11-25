
const util = require('./.grunt/main');

module.exports = function(grunt) {
  


  // Project configuration.
  grunt.initConfig({
    clean: util.inject('clean'),
    ts: util.inject('ts'),
    watch: util.inject('watch'),
    express: util.inject('express'),
    sass: util.inject('sass'),
    exec: util.inject('exec'),
copy: util.inject('copy'),
  });

  
  // Default task(s).
  grunt.registerTask('default', ['clean:app', 'ts:app', 'express:dev', 'exec:builSass','copy:app','watch']);

  grunt.registerTask('build:production', ['clean:app', 'ts:app', 'exec:builSass','copy:app']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');

};

