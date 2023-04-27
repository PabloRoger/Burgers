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

module.exports = {
  getAllBurgers
};
