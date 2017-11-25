import * as Sequelize from 'sequelize';

import { debug } from './debug';

const d = debug('app:mysql');

export function getConnection(conf: {
    user: string;
    pass: string;
    db: string;
    host?: string;
    port?: number;
}) {

    let opt = { host: '127.0.0.1', port: 3306 };
    conf = { ...conf, ...opt };

    const connection = new Sequelize(`mysql://${conf.user}:${conf.pass}@${conf.host}:${conf.port}/${conf.db}`);

    connection
        .authenticate()
        .then(() => {
            d.log('Connection has been established successfully.');
        })
        .catch((err) => {
            d.err('Unable to connect to the database:', err);
        });
    connection.query('SET SESSION sql_mode=""');
    // export const sequelize = connection;
    return connection;

}