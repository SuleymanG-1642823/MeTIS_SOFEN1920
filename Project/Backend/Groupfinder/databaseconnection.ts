const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'TODO', /* default: localhost */
    port: 'TODO', /* default: 3306 */
    user: 'TODO',
    password: 'TODO',
    database: 'TODO'
});

module.exports = connection;