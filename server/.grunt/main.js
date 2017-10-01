
const path = require('path');
const config = require('./config');
const cnf = {
  app: {
    src: config.src,
    dest: config.dest
  }
};

module.exports = {
  inject: function(task) {
     return require(path.resolve(__dirname, 'tasks', task))(cnf, arguments);
   }
};
