import * as Sequelize from 'sequelize';

import { connection as sequelize} from './connections';

export const SmsItems = sequelize.define('sms_items', {
  text: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  smsId: {
    type: Sequelize.INTEGER
  },
  subId: {
    type: Sequelize.INTEGER
  },
  fname: {
    type: Sequelize.STRING
  },
  lname: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  response: {
    type: Sequelize.STRING
  },
  clApiMsgId: {
    type: Sequelize.STRING
  },
  clCharge: {
    type: Sequelize.STRING
  },
  clStatus: {
    type: Sequelize.STRING
  },
  clFrom: {
    type: Sequelize.STRING
  }
});