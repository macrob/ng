module.exports = function (cnf) {

	return {                              // Task 
    dist: {
         files: [{
           expand: true,
           cwd: cnf.app.src,
           src: ['**/*.scss'],
           dest: cnf.app.dest,
           ext: '.css'
         }]
       }
  }
};
