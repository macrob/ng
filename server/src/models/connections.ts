import { mysql } from '../config/config';

import { getConnection } from '../express/express';

export const connection = getConnection(mysql.test);