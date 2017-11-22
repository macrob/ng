const path = require('path');
const _ = require('lodash');

let assets = ['!node_modules/**', '**/*.html', '**/*.js', '**/*.css', '**/*.md', '**/*.xml', '**/*.ico', '**/*.txt', '**/*.png', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'];

module.exports = function(cnf) {

  return {
    options: {
      livereload: true,
      spawn: true // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
    },
    app: {
      files: [
        cnf.app.src + '/**/*.ts',
      ],
      tasks: [
        'ts:app'
      ]
    },
    server: {
          files: [
            cnf.app.dest + '/**/*.js',
          ],
          tasks: [
            'express:dev:stop',
            'express:dev:start'
          ],
          options: {
            livereload: true,
            spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
          }
        }
  };
};