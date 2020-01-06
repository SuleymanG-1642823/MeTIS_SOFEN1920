const mysql = require('mysql');
import {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} from './Helpers/constants'

const connection = mysql.createConnection({
   host: DB_HOST,
   port: DB_PORT,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_NAME
});

module.exports = connection;