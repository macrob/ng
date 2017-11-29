const grunt = require('grunt');
var debug = require('debug')('grunt:cnf');
const fs = require('fs');
const path = require('path');

const config = require('../config');
module.exports = function(cnf) {


console.log(cnf);
  return {
    // buildFront: {
    //   sync: true,
    //   cmd: 'cd '+ph+'; ng build --output-path ' + config.frontend.dest
    // 
    // },
    ngInfo: {
      sync: true,
      cmd: function(grunt) {
        console.log(process.env);
      }
    },
    ngTest: {
      sync: true,
      cmd: `echo Test`
    },
    ngMv: {
      sync: true,
      cmd: `mv ${config.resolveNg(config.ngApp.outDir)}/* ${config.resolveSrv(config.package.build, 'public')}`
    },
    ngBuild: {
      sync: true,
      cwd: config.resolveNg(),
      cmd: `ng build --aot --vendor-chunk --extract-css --delete-output-path -prod --e prod`
    },
    ngPreBuild: {
      sync: true,
      cwd: config.resolveNg(),
      cmd: `node ./node_modules/ng-node-environment/index.js; npm install;`
    },
    ngServe: {
      sync: false,
      cwd: config.resolveNg(),
      cmd: `ng serve --disable-host-check  --hmr`
    },
    builSass: {
      sync: false,
      cmd: 'node-sass ' + cnf.app.src + '/public/css/main.scss' + ' ' + cnf.app.dest + '/public/css/main.css'

    }
  }
}