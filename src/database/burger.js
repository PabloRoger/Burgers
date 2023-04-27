const connection = require('./connection');

function getAllBurgers(callback) {
  const query = 'SELECT * FROM Burger';

  connection.query(query, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function getBurgerById(burgerId, callback) {
  const query = 'SELECT * FROM Burger WHERE burger_id = ?';

  connection.query(query, burgerId, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result[0]);
    }
  });
}

module.exports = {
  getAllBurgers,
  getBurgerById
};
