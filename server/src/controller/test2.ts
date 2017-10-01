
import * as _ from 'lodash';
import * as express from 'express';
import { Controller } from '../express/express';
import { User } from '../models/user';

export class Test2 extends Controller {

  constructor() {
    super('index');
  }

  public index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
    return {data: [
      {countryName: 'Myanmar'},
      {countryName: 'Myanmar2'},
      {countryName: 'Myanmar3'},
      {countryName: 'Myanmar4'},
      {countryName: 'Myanmar5'},
    ]};
  }

  public demoMysql(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
    return User.findAll();
  }
}
