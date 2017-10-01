const path = require('path');
module.exports = function(cnf) {

  const PH_SOURCE = cnf.app.src;
  const PH_BUILD = cnf.app.dest;


  return {
    default: {
      tsconfig: false,
      options: {
        verbose: true
      },
      exclude: [
        'node_modules',
        '.*.ts',
        '_.*.ts',
        '_.*.spec.ts'
      ]
    },
    /* Backend - SERVER */
    app: {
      options: {
        moduleResolution: 'Node',
        baseUrl: PH_SOURCE,
        lib: [
          'es2016', 'dom'
        ],
        types: [
          'node',
          'express',
          'jquery',
        ]
      },
      files: [{
        src: [
          PH_SOURCE + '/**/*.ts',
          '!' + PH_SOURCE + '/**/*.spec.ts',
          '!' + PH_SOURCE + '/**/.*.ts',
          '!' + PH_SOURCE + '/.*.ts'

        ],
        dest: PH_BUILD + '/'
      }]
    }
  };
};