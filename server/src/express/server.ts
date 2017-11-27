import * as http from 'http';
import * as fs from 'fs';
import * as check from 'check-types';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as flash from "express-flash";
import * as session from "express-session";
import * as connectRedis from 'connect-redis';

import * as cheerio from 'cheerio';
import * as interceptor from 'express-interceptor';

import { Routing } from './routing';

// import * as config from './config';
import { resolve } from './config';
import { routing, NavbarMenu, redis as cnfRedis, staticFolder } from '../config/config';

import expressValidator = require("express-validator");


class Web {

  private router: express.Router;

  constructor(
    public app: express.Application = express()) {

    this.router = new Routing(routing).get();

    const cookieParser = require('cookie-parser');
    const logger = require('morgan');
    const useragent = require('express-useragent');
    const fileUpload = require('express-fileupload');

    let sessionOpt: {
      store?: any
    } = {};

    if (check.not.null(cnfRedis)) {
  console.log('REDIST START', cnfRedis);
      let redisStore = connectRedis(session);

      sessionOpt.store = new redisStore(cnfRedis);
    }

    this.app.use(session({
      secret: 'test',
      cookie: { maxAge: 60000, secure: true },
      resave: false,
      saveUninitialized: true
    , ...sessionOpt}));

    this.app.use(logger('dev'));
    this.app.use(fileUpload());
    this.app.use(expressValidator());
    this.app.use(flash());
    this.app.set("views", resolve("../views"));
    this.app.set("view engine", "pug");

    // default menu for layout
    this.app.locals = { navBar: NavbarMenu};
    this.app.set('trust proxy', true);

    // this.app.set('views', path.join(__dirname, 'views'));
    // this.app.set('view engine', 'jade');

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(useragent.express());
    // this.app.use(methodOverride());

    // this.app.use('/adm/', express.static(this.config.root('public/')));
    this.app.use(express.static(resolve('public/')));
    this.app.use(express.static(staticFolder));

//     
//     let livereload = interceptor(function(req, res){
// // console.log(res.get('Content-Type'));
//       return {
//         // Only HTML responses will be intercepted 
//         isInterceptable: function(){
//           return /text\/html/.test(res.get('Content-Type'));
//         },
//         // Appends a paragraph at the end of the response body 
//         intercept: function(body, send) {
//           var $document = cheerio.load(body);
//     
//           let host = '172.16.223.132:35729';
//           $document('body').append(`<script src="http://${host}/livereload.js?snipver=1"> </script>`);
//      
//           send($document.html());
//         }
//       };
//     })
//      
//     // Add the interceptor middleware 
//     app.use(livereload);

    // this.app.use('/amexio/', express.static(this.config.resolve('/var/www/stat/front/node_modules/amexio-ng-extensions/')));
    // this.app.use('/nmcss/', express.static(this.config.resolve('/var/www/stat/front/node_modules/')));
    // this.app.use('/assets/data/', express.static(this.config.resolve('/var/www/stat/front/src/assets/data/')));
    // 
    // this.app.use(require('connect-livereload')({
    //   // host: '172.16.223.132',
    //   port: 35729,
    //   src: "http://172.16.223.132:3000/livereload.js?snipver=1",
    // }));
    // this.app.use('/agenda', Job.getInstance().agendash());

    this.app.use(this.router);
    this.app.use((req, res, next) => {
        res.status(404);
        res.sendfile(resolve('public/index.html'));
    });

  }
}

const web = new Web();
module.exports = web.app;
