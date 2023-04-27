const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'burgers'
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos: ', error);
  } else {
    console.log('Conexión establecida con la base de datos.');
  }
});

module.exports = connection;
