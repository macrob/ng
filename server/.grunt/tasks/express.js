var debug = require('debug')('grunt:cnf');
const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = function(cnf) {
  process.env.NODE_PATH = cnf.app.dest;

  return {
    options: {
      // Override defaults here
      node_env: 'dev',
      background: true,
      debug: false,
      output: ".+",
      delay: 0,
    },
    dev: {
      options: {
        script: config.main
      }
    },
  }
};
