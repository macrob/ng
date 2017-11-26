const path = require('path');
module.exports = function(cnf) {

  const PH_SOURCE = cnf.app.src;
  const PH_BUILD = cnf.app.dest;

  const PH_FRONT_SOURCE = cnf.frontend.src;
  const PH_FRONT_BUILD = cnf.frontend.dest;

  return {
    default: {
      tsconfig: false,
      options: {
        verbose: true
      },
      exclude: [
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
        rootDir: PH_SOURCE,
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
    },

    /* frontend */
    frontend: {
          options: {
            moduleResolution: 'Node',
            baseUrl: PH_FRONT_SOURCE,
            lib: [
              'es2016',
              'dom'
            ],
            types: [
              // 'node',
              // 'express',
              'jasmine'
            ],
            experimentalDecorators: true
          },
          files: [{
            src: [
        
              // '!' + PH_FRONT_SOURCE + '/**/*.spec.ts',
              // '!' + PH_FRONT_SOURCE + '/**/.*.ts',
              // '!' + PH_FRONT_SOURCE + '/.*.ts',
              path.resolve(PH_FRONT_SOURCE) + '/**/*.ts'
        
            ],
            dest: PH_FRONT_BUILD + '/'
          }]
        }
  };
};