module.exports = function (cnf) {

	return {
		app: [cnf.app.dest, cnf.app.src + '/**/._*'],
    frontend: [cnf.frontend.dest, cnf.frontend.src + '/**/._*']
	};
};
