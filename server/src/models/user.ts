import * as Sequelize from 'sequelize';

import { sequelize } from '../express/express';

export const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING },
  lastName: {
    type: Sequelize.STRING }});