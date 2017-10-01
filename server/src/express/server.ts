
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as fs from 'fs';

import { Routing } from './routing';
import * as config from './config';
import { resolve } from './config';
import { routing } from '../config/config';

class Web {

  private router: express.Router;

  constructor(
    public app: express.Application = express()) {

    this.router = new Routing(routing).get();

    const cookieParser = require('cookie-parser');
    const logger = require('morgan');
    const useragent = require('express-useragent');
    const fileUpload = require('express-fileupload');

    this.app.use(logger('dev'));
    this.app.use(fileUpload());

    app.set("views", resolve("../views"));
    app.set("view engine", "pug");

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
    // this.app.use('/adm/', express.static(this.config.root('public/')));
    this.app.use(express.static(resolve('public')));
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
  }
}

const web = new Web();
module.exports = web.app;
