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
        DEBUG: '*',
        NODE_ENV: 'production'
      },
      env_devtest : {
        DEBUG: '*',
        NODE_ENV: 'devtest'
      },
      env_glanding : {
        DEBUG: '*',
        NODE_ENV: 'glanding'
      }
    },

    // Second application
 
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    devtest : {
      user : 'root',
      host: '212.71.248.195',
      ssh_options: ["port=3784;LocalCommand=bash;"],
      key  : './macrob2key',
      ref  : 'origin/master',
      repo : 'https://github.com/macrob/ng.git',
      path : '/var/www/sms',
      // "pre-setup" : "bash",
      // 'pre-deploy' : 'env SHARED=/var/www/sms/shared bash',
      'post-deploy' : './server/post-deploy && pm2 restart ecosystem.config.js WEB --env devtest',
      
    },
    glanding : {
      user : 'root',
      host: '176.58.111.51',
      ssh_options: ["port=22"],
      key  : './macrob2key',
      ref  : 'origin/master',
      repo : 'https://github.com/macrob/ng.git',
      path : '/var/www/sms',
      'post-deploy' : 'cd ./server/ && ./post-deploy && pm2 restart ecosystem.config.js WEB --env glanding'
    }
    }
};
