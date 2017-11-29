
const path = require('path');
const config = require('./config');

const cnf = {
  app: {
    src: config.src,
    dest: config.dest
  },
  frontend: {
    src: config.ng.src,
    dest: config.ng.dest
  }
};

module.exports = {
  inject: function(task) {
     return require(path.resolve(__dirname, 'tasks', task))(cnf, arguments);
   }
};
