import { getConnection } from '../express/express';
import { mysql } from '../config/config';
console.log(mysql);
export const connection = getConnection(mysql.test);