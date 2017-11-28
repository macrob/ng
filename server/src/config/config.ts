import * as _ from 'lodash';
import * as check from 'check-types';
import * as path from 'path';

import * as dotenv from "dotenv";
dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

let packageJson = require(`${process.env.PWD}/package.json`);

console.log(`ENV config/${process.env.NODE_ENV}.env`);
export const mysql = {
    test: {
        db: process.env.MYSQL_TEST_DB,
        user: process.env.MYSQL_TEST_USER,
        pass: process.env.MYSQL_TEST_PASS
    }
}

export const host: string = process.env.EXPRESS_HOST;
export const port: number = parseInt(process.env.EXPRESS_PORT);


export * from './routing';
export * from './navber-nav';

type cRedisCnf = {
    client?: string;
    host?: string;
    port?: string | number;
    socket?: string;
    url?: string;
};


const expressStaticContentFolder = [];
expressStaticContentFolder.push('public');

if(process.env.HOT_SERVE) {


  let frontendPth = packageJson.frontend;
  if (!frontendPth) {
    throw Error('process.env.npm_package_frontend not found');
  }
// console.log(path.resolve(process.env.PWD, frontendPth, 'node_modules'));
  expressStaticContentFolder.push(path.resolve(process.env.PWD, frontendPth, 'src'));
  expressStaticContentFolder.push(['/npm/',path.resolve(process.env.PWD, frontendPth, 'node_modules')]);
}

export const expressStatic = expressStaticContentFolder;


export const redis: cRedisCnf | null = function() {
    let redisconf: cRedisCnf =
        {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        };

    redisconf = _.omitBy(redisconf, _.isUndefined);
    
    return check.emptyObject(redisconf) ? null : redisconf;
}();
