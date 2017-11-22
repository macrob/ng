module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'WEB',
      script    : 'dist/server.js',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'dev'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
 
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host: '176.58.117.221',
      ssh_options: ["port=3784"],
      key  : './macrob2key',
      ref  : 'origin/master',
      repo : 'https://github.com/macrob/ng.git',
      path : '/var/www/sms',
      'post-deploy' : 'cd server && npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
