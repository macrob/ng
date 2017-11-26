export * from './sms';
export * from './smsItems';
export * from './user';

import { debug } from '../express/express';
const d = debug('app:models');

import { connection as sequelize} from './connections';
sequelize.sync().catch(d.err);