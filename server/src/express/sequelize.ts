import * as Sequelize from 'sequelize';

import { debug } from './debug';

const d = debug('app:mysql');

const connection = new Sequelize('mysql://root:qazbvcs34g@127.0.0.1:3306/billan');

connection
  .authenticate()
  .then(() => {
    d.log('Connection has been established successfully.');
  })
  .catch((err) => {
    d.err('Unable to connect to the database:', err);
  });
connection.query('SET SESSION sql_mode=""');
export const sequelize = connection;