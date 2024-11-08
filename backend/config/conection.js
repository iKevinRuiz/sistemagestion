// db.js
const mysql = require('mysql2');
require('dotenv').config();

const conection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NAME,
});

conection.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err);
        return;
    }
    console.log('Conexión exitosa con la base de datos');
});

module.exports = conection;
