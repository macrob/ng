const path = require('path');

module.exports = function(cnf) {
  let files = {};

    files[cnf.frontend.dest+'/index.html'] = [

      cnf.frontend.src+'/inline**js',
      cnf.frontend.src+'/polyfill**js',
      cnf.frontend.src+'/styles**js',
      cnf.frontend.src+'/vendor**js',
      cnf.frontend.src+'/main**js',

      cnf.frontend.src+'/css/*.css',
    ];
  return {
    options: {
      template: cnf.frontend.dest+'/index.html',
      ignorePath: cnf.frontend.src,
    },

    defaults: {

      files: files
    },
    systemJS: {
      options: {
        template: cnf.frontend.dest+'/index.html',
        starttag: '<!-- headjs -->',
        endtag: '<!-- endheadjs -->',
        ignorePath: cnf.frontend.src
      },
      dest: cnf.frontend.dest+'/index.html',
      src: cnf.frontend.src+'/js/systemjs.config.js'

    }
  }
}
