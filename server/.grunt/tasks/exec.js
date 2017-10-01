var debug = require('debug')('grunt:cnf');
const fs = require('fs');
const path = require('path');


module.exports = function(cnf) {
  let ph = path.resolve(cnf.app.src, '..');

  return {
    // buildFront: {
    //   sync: true,
    //   cmd: 'cd '+ph+'; ng build --output-path ' + cnf.frontend.dest
    // 
    // },
  builSass: {
      sync: false,
      cmd: 'node-sass ' +cnf.app.src + '/public/css/main.scss' +' '+cnf.app.dest + '/public/css/main.css'

    }
  }
}