import * as dotenv from "dotenv";


export * from './routing';
export * from './navber-nav';


dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

export const mysql = {
  test: {
    db:  process.env.MYSQL_TEST_DB,
    user: process.env.MYSQL_TEST_USER,
    pass: process.env.MYSQL_TEST_PASS
  }
}
console.log(mysql);
export const host:string = process.env.EXPRESS_HOST;
export const port: number = parseInt(process.env.EXPRESS_PORT);
