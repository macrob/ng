const path = require('path');

module.exports = function(cnf) {
  let files = {};

    files[cnf.frontend.dest+'/index.html'] = [

      cnf.frontend.dest+'/inline**js',
      cnf.frontend.dest+'/polyfill**js',
      cnf.frontend.dest+'/styles**js',
      cnf.frontend.dest+'/vendor**js',
      cnf.frontend.dest+'/main**js',

      cnf.frontend.dest+'/css/*.css',
    ];
  return {
    options: {
      template: cnf.frontend.dest+'/index.html',
      ignorePath: cnf.frontend.dest,
    },

    defaults: {

      files: files
    },
    systemJS: {
      options: {
        template: cnf.frontend.dest+'/index.html',
        starttag: '<!-- headjs -->',
        endtag: '<!-- endheadjs -->',
        ignorePath: cnf.frontend.dest
      },
      dest: cnf.frontend.dest+'/index.html',
      src: cnf.frontend.dest+'/js/systemjs.config.js'

    }
  }
}
