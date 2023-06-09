const mysql = require('mysql');

// create connection to database with credentials
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'burgers'
});

connection.connect((error) => {
  if (error) {
    console.error('Database is not connected: ', error);
  } else {
    console.log('Database connected');
  }
});

module.exports = connection;
