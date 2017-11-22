import * as Sequelize from 'sequelize';

import { sequelize } from '../express/express';

export const Sms = sequelize.define('sms', {
  text: {
    type: Sequelize.STRING },
  phones: {
    type: Sequelize.STRING },
  isParsed: {
    type: Sequelize.INTEGER },
});