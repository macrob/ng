const grunt = require('grunt');
const path = require('path');
// const dotenv = require('dotenv');

// dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });
require('./setenv');



  let package = grunt.file.readJSON('package.json');
  let packageFrontend = grunt.file.readJSON(`${package.frontend}package.json`);
  let ngCli = grunt.file.readJSON(`${package.frontend}.angular-cli.json`);
  let ngApp = ngCli.apps.pop();


  let resolveNg = function(...dirname) {
    // console.log(path.resolve(process.env.PWD, cnfPackage.frontend));
   return path.resolve(package.frontend, ...dirname);
  }

  let resolveSrv = function(...dirname) {
    return path.resolve(...dirname);
  }

module.exports = {
  dest: resolveSrv(package.build),
  src: resolveSrv(package.src),
  main: resolveSrv(package.main),

  ng: {
    pth: resolveNg(),
    src: resolveNg(ngApp.root),
    dest:  resolveNg(ngApp.outDir),
  },
  package,
  packageFrontend,
  ngCli,
  ngApp,
  resolveNg,
  resolveSrv
};