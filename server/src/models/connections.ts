import { getConnection } from '../express/express';
import { mysql } from '../config/config';

export const connection = getConnection(mysql.test);