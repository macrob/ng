
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
    injector: util.inject('injector'),
  });


  grunt.registerTask('build:app', 
  [
      'clean:app', 'ts:app', 'express:dev', 'exec:builSass','copy:app'
  ]);
  // 
  // grunt.registerTask('build:front', 
  // [
  //     'clean:frontend',
  //     'ts:frontend',
  //     'copy:frontend',
  //     'injector'
  // ]);
  grunt.registerTask('compile:frontendIndex', 
  [
      'copy:frontendIndex',
      'injector'
  ]);
  
  grunt.registerTask('serve:front', 
  [
      'clean:frontend',
      // 'ts:frontend',
      'compile:frontendIndex'
  ]);
  // Default task(s). start node express server with pug template
  grunt.registerTask('default', ['build:app','watch']);

  grunt.registerTask('serve', ['build:app', 'serve:front','watch']);

  grunt.registerTask('compile:app', ['build:app']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-injector');

};

