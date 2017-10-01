import * as path from 'path';
import * as check from 'check-types';

import * as config from '../config/config';
export * from './routing';

export function resolve(name: string) {
  return path.resolve(__dirname, '..', name);
}


export function mysql(connectionName: string = null) {

  let conf;
  switch (true) {
    case check.null(connectionName):
      conf = config.mysql;
      break;
    default:
      if (check.undefined(config.mysql[connectionName])) {
        throw Error(` ${connectionName} not found`);
      }

      conf = config.mysql[connectionName];
  }

  conf = {
    ...{
      host: '127.0.0.1',
      port: '3306',
    }, ...conf
  };

  return `mysql://${conf.user}:${conf.pass}@${conf.host}:3306/billan`
}

export const host = config.host;
export const port = config.port || 3000;