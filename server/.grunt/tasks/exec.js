const grunt = require('grunt');
var debug = require('debug')('grunt:cnf');
const fs = require('fs');
const path = require('path');

module.exports = function(cnf) {
  let ph = path.resolve(cnf.app.src, '..');

  let npmPackage = grunt.file.readJSON('package.json');

 
  return {
    // buildFront: {
    //   sync: true,
    //   cmd: 'cd '+ph+'; ng build --output-path ' + cnf.frontend.dest
    // 
    // },
    ngTest: {
      sync: true,
      cmd: `echo Test`
  },
    ngPreBuild: {
        sync: true,
        cmd: `cd ${npmPackage.frontend}; node ./node_modules/ng-node-environment/index.js`
      },
    ngServe: {
        sync: false,
        cmd: `cd ${npmPackage.frontend}; ng serve --disable-host-check  --hmr --api`
      },
  builSass: {
      sync: false,
      cmd: 'node-sass ' +cnf.app.src + '/public/css/main.scss' +' '+cnf.app.dest + '/public/css/main.css'

    }
  }
}