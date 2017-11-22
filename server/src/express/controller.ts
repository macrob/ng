import * as express from 'express';
import * as url from 'url';
import * as check from 'check-types';
// import * as querystring from 'querystring';

// import { Config } from 'config/config';
import { debug, Redirect } from './express';



export class Controller {
  public debug: any;
  public error: any;

  public gif = require('emptygif');

  constructor(scope: string) {

    this.debug = debug('app:controllers:' + scope);
  }

  public do(method: string, req: express.Request, res: express.Response, next: express.NextFunction) {
    const response = (this)[method](req, res, next);
 

    switch (true) {
      case check.undefined(response):

        break;
      case check.instance(response, Promise):
        this.response(response, req, res);
        break;
      case check.instance(response, Redirect):
        this.location(response.to(), req, res);
        break;
      default:
        this.sendResult(response, res);
    }
  }

  public response(data: Promise<any>, req: express.Request, res: express.Response): void {
    data.then((result: any) => {

      switch (true) {
        case check.undefined(result):

          break;
        case check.instance(result, Redirect):
          this.location(result.to(), req, res);
          break;
        default:
          this.sendResult(result, res);
      }

    }).catch(this.internalError.bind(this, [req, res]));
  }

  public sendResult(result: any, res: express.Response): void {
    if (!check.string(result)) {
      res.setHeader('Content-Type', 'application/json');
    }

    res.send(result);
  }

  public internalError([req, res]: [express.Request, express.Response], error: Error): void {
    console.log({ error, req });
    res.sendStatus(500);
  }

  public location(location: Promise<string>, req: express.Request, res: express.Response): void {
    location.then((uri: string) => {
      res.set({
        'Content-Length': '0',
        'Location': uri});

      res.sendStatus(303);
    }).catch(this.internalError.bind(this, [req, res]));
  }

  public showGif(req: express.Request, res: express.Response): void {
    this.gif.sendEmptyGif(req, res, {
      'Cache-Control': 'public, max-age=0', // or specify expiry to make sure it will call everytime
      'Content-Length': this.gif.emptyGifBufferLength,
      'Content-Type': 'image/gif' });
  }

  protected redirect(uri: string | Promise<string>, params?: object): Redirect {
    return new Redirect({ uri, params });
  }

  protected getUrl(req: express.Request): string {

    const requrl = url.format({
      host: req.get('host'),
      pathname: req.originalUrl,
      protocol: req.protocol,
      query: req.query });

    return requrl;
  }

}
