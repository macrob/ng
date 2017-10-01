
import { Home, Test, Test2 } from '../controller/controller';


export const routing = [
  ['/', Home, 'get:index'],
  ['/test1/', Test, 'get:index'],
  ['/test2/', Test2, 'get:demoMysql'],
];
