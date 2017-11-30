
import * as _ from 'lodash';
import * as express from 'express';
import { execSync } from 'child_process';
import { Controller } from '../express/express';

import { exchange, MyWallet } from 'blockchain.info';

export class Btc extends Controller {
  title = 'Btc';

  constructor() {
    super('btc');
  }

  public index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
    let debug = this.debug;
   
    return exchange.getTicker();
  }

  public getaddress(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
    let debug = this.debug;
    let amount = req.body.amount;

     return execSync('electrum addrequest '+amount);
   
  }
}


