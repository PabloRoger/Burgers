const connection = require('./connection');

function getAllBurgers(callback) {
  const query = 'SELECT * FROM Burger';

  connection.query(query, (error, results) => {
    // MANAGE ERROR
    error ? callback(error, null) : callback(null, results);
  });
}

function getBurgerById(burgerId, callback) {
  const query = 'SELECT * FROM Burger WHERE burger_id = ?';

  connection.query(query, burgerId, (error, result) => {
    // MANAGE ERROR
    error ? callback(error, null) : callback(null, result[0]);
  });
}

function createBurger(burgerData) {
  const query = 'INSERT INTO Burger SET ?';

  connection.query(query, burgerData, (error, results) => {
    // MANAGE ERROR
    error ? callback(error, null) : callback(null, results);
  });
}

module.exports = {
  getAllBurgers,
  getBurgerById,
  createBurger
};
