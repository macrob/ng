
import * as _ from 'lodash';
import * as express from 'express';

// import { User } from 'sequelize/user';
import { Controller  } from '../express/express';
import { connection as sequelize } from '../models/connections';

export class Test extends Controller {

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
    const query =
    `select
      date(created_at) as dt,
      count(*) as total,
      sum(if(payment_status_id=3,1,0)) \`approve\`,
      sum(if(payment_status_id=1,1,0)) \`decline\`,
      sum(if(payment_status_id=2,1,0)) \`pending\`
    from orders
    group by date(created_at)
    order by created_at DESC
    limit 10`;

    return sequelize.query(query).then((records) => {
      return {data: records[0]};
    });
  }
}
