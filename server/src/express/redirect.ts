import * as express from 'express';
import * as url from 'url';
// import * as querystring from 'querystring';

import * as check from 'check-types';

export class Redirect {
  public url: string | Promise<string>;
  public params: object;

  constructor({ uri, params }: { uri: string | Promise<string>; params?: object }) {
    this.url = uri;
    this.params = params;

  }

  public to(): Promise<string> {

    let to: any;

    switch (true) {
      case check.instance(this.url, Promise):
        to = this.url;
        break;
      case check.string(this.url):
        to = new Promise((resolve, reject) => { resolve(this.url); });
        break;
    }

    return (to as Promise<string>).then(this.query.bind(this));
  }

  private query(rurl: string): string {
    const u = url.parse(rurl);

    if (this.params) {
      u.query = this.params;
    }

    return url.format(u);
  }
}
