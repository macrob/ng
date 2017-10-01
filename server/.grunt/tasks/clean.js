module.exports = function (cnf) {

	return {
		app: [cnf.app.dest, cnf.app.src + '/**/._*']
	};
};
