import * as express from 'express';

export class Routing {

  constructor(private routing, private router: express.Router = express.Router()) {
    this.assign(this.routing);
  }

  public get(): express.Router {
    return this.router;
  }

  private assign(routing: any[]): void {
    const check = require('check-types');

    const controllers: any[] = [];

    for (const rt of routing) {

      const route: string = rt[0] as string;
      const method: string = rt[2] as string;
      const cntrlName: string = rt[1].name as string;

      if (check.not.assigned(controllers[cntrlName])) {
        controllers[cntrlName] = new rt[1]();
      }

      const cntrl: any = controllers[cntrlName];

      // this.router.get(route, cntrl[method].bind(cntrl));
      const splited: string[] = method.split(':');

      if (splited.length === 2) {
        this.router[splited[0]](route, cntrl.do.bind(cntrl, splited[1]));
      } else {
        this.router.get(route, cntrl.do.bind(cntrl, method));
      }
    }
  }
}
