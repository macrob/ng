
import * as _ from 'lodash';
import * as express from 'express';
import { Controller } from '../express/express';

import { exchange } from 'blockchain.info';

export class Btc extends Controller {
  title = 'Btc';

  constructor() {
    super('btc');
  }

  public index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
    let debug = this.debug;
   
    return exchange.getTicker();
  }
}


