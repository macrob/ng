import { mysql } from '../config/config';

import { getConnection } from '../express/express';
console.log(mysql);
export const connection = getConnection(mysql.test);