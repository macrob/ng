
import * as _ from 'lodash';
import * as express from 'express';
import { Controller } from '../express/express';


export class Home extends Controller {
  title = "Home";
  constructor() {
    super('index');
  }

  public index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {

    return res.render("home", {
      title: this.title
    });
  }



}
