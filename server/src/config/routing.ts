
import { Home, Contact, Test, Test2, Sms, Btc } from '../controller/controller';


export const routing = [
  ['/', Home, 'get:index'],

  ['/contact', Contact, 'get:index'],
  ['/contact', Contact, 'post:submit'],

  ['/test1/', Test, 'get:index'],
  ['/test2/', Test2, 'get:demoMysql'],

  ['/sms/', Sms, 'get:index'],
  ['/sms/', Sms, 'post:submit'],
  ['/clickatell/', Sms, 'post:callback' ],

  ['/api/btc', Btc, 'get:index']
];
