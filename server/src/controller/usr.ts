
import * as _ from 'lodash';
import * as express from 'express';
import { execSync } from 'child_process';
import { Controller } from '../express/express';

import { exchange, MyWallet } from 'blockchain.info';

import { User } from '../models/models';
import * as md5 from 'md5';

export class Usr extends Controller {
  title = 'usr';

  constructor() {
    super('usr');
  }

  public add(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
    req.assert("phone", "Text cannot be blank").notEmpty();
    req.assert("email", "To cannot be blank").notEmpty();
    req.assert("password", "To cannot be blank").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      
      return errors;
    }
    
    return User.create({
      phone: _.get(req.body, 'phone', 'default'),
      email: _.get(req.body, 'email', 'default'),
      password: md5(_.get(req.body, 'password', 'default'))
    });
  }
}


