import * as Sequelize from 'sequelize';

import { connection as sequelize} from './connections';

export const Sms = sequelize.define('sms', {
  text: {
    type: Sequelize.STRING },
  phones: {
    type: Sequelize.STRING },
  isParsed: {
    type: Sequelize.INTEGER },
});