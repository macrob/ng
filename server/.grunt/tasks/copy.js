const grunt = require('grunt');
const path = require('path');

module.exports = function(cnf) {

  let assets = ['!node_modules/**', '**/*.html', '**/*.js', '**/*.css', '**/*.md', '**/*.xml', '**/*.ico', '**/*.txt', '**/*.png', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'];
  //
  // cnf.bower = {
  // 	src: 'src/bower/bower_components/',
  // 	dest: cnf.build + 'bower_components/'
  // };

  return {

    // template: {flatten: false, cwd: cnf.srcTpl, expand: true, src: ['**/*.html', '**/*.js', '**/*.css', '**/*.md', '**/*.xml', '**/*.ico', '**/*.txt', '**/*.png'], dest: cnf.build },
    // template: {flatten: false, cwd: cnf.srcTpl, expand: true, src: assets, dest: cnf.build },
    // app: {flatten: false, cwd: cnf.srcApp, expand: true, src: ['**/*.html', '**/*.js', '**/*.css', '**/*.md', '**/*.xml', '**/*.ico', '**/*.txt', '**/*.png'], dest: cnf.build+'/app/' },
    app: {
      flatten: false,
      cwd: cnf.app.src,
      expand: true,
      src: assets,
      dest: cnf.app.dest
    },
    // karma: {flatten: false, cwd: 'config/karma/', expand: true, src: ['**/*.js', '**/*.txt'], dest: cnf.build + '/karma/' },

    // templateSing: {flatten: false, cwd: cnf.templateSing.assetsSrc, expand: true, src: assets, dest: cnf.templateSing.assetsDest },
    // bower: {flatten: false, cwd: cnf.bower.src, expand: true, src: assets, dest: cnf.bower.dest },

    frontend: {
      flatten: false,
      cwd: cnf.frontend.src,
      expand: true,
      src: assets,
      dest: cnf.frontend.dest,

    },
    frontendIndex: {

      flatten: false,
      cwd: cnf.frontend.src,
      expand: true,
      src: ['index.html'],
      dest: cnf.frontend.dest,
      options: {
        process: function(content, srcpath) {


          let livereload = `<script>document.write('<script src="http://'
      + (location.host || 'localhost').split(':')[0]
      + ':35729/livereload.js"></'
      + 'script>')</script> `;

          content = content.replace('<body>', '<body>' + livereload);

          const package = grunt.file.readJSON(cnf.frontend.src + '/upkg.json');
          for (let src of package.scripts) {

            content = content.replace('<!-- upkg -->', '<script src="' + src + '"></script><!-- upkg -->');

          }

          let initMain = `<script>
              try {
                 System.import('main.ts').catch(function(err){ console.error(err); });
              } catch(e) {
              console.error(e);
            }
          </script>`;

          content = content.replace('<!-- SYSTEMJSIMPORT -->', initMain);


          return content;
        }


      }

    },
    frontendTs: {
      flatten: false,
      cwd: cnf.frontend.src,
      expand: true,
      src: ['**/*.ts'],
      dest: cnf.frontend.dest,
    }
  };

};