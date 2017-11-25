import * as _ from 'lodash';
import * as check from 'check-types';

import * as dotenv from "dotenv";
dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });


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

export const redis: cRedisCnf | null = function() {
    let redisconf: cRedisCnf =
        {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        };

    redisconf = _.omitBy(redisconf, _.isUndefined);
    
    return check.emptyObject(redisconf) ? null : redisconf;
}();
