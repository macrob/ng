export * from './sms';
export * from './smsItems';
export * from './user';

import { connection as sequelize} from './connections';
sequelize.sync().then(console.log).catch(console.error);