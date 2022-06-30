const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '109.106.254.201',
    user: 'u921810722_root',
    password: '1289james7823',
    database: 'u921810722_db_school',
    port: '3306'
});

connection.connect(function (err) {
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
        return;
    } else {
        console.log('Conexion exitosa.');
    }
});

module.exports = connection;