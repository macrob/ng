const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let env = process.env.NODE_ENV;
console.log('NODE_ENV '+env);

dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

process.env.NG_API = `//${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`;
