const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', /* default: localhost */
    port: '3306', /* default: 3306 */
    user: 'finder',
    password: '9=&c0dL$_N+9+_}pmgx]4JE*',
    database: 'groupfinder'
});

module.exports = connection;