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

  return `mysql://${conf.user}:${conf.pass}@${conf.host}:${conf.port}/${conf.db}`
}

export const host: string = config.host || '127.0.0.1';
export const port: number = config.port || 3000;