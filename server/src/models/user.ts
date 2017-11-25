import * as Sequelize from 'sequelize';

import { connection as sequelize} from './connections';

export const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING },
  lastName: {
    type: Sequelize.STRING }});