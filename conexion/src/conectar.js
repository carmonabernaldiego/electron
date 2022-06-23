const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_school',
    port: '3306'
});

connection.connect(function (err) {
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
        return;
    } else {
        console.log('conexion exitosa');
    }
});

module.exports = connection;