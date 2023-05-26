const connection = require('./connection');

function getAllBurgers(callback) {
  const query = 'SELECT * FROM Burger';

  connection.query(query, (error, results) => {
    /**
     * callback is a function that will be executed when the query is finished
     * the first parameter is the error, the second is the result
     * it is used to manage the error and the result of the query
     */
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

function getIngredients(callback) {
  const query = 'SELECT * FROM ingredients';

  connection.query(query, (error, results) => {
    // MANAGE ERROR
    error ? callback(error, null) : callback(null, results);
  });
}

function getRanking(callback) {
  const query = 'SELECT * FROM Ranking ORDER BY rating DESC';

  connection.query(query, (error, results) => {
    // MANAGE ERROR
    error ? callback(error, null) : callback(null, results);
  });
}

function getBurgersByUserId(userId, callback) {
  const query = 'SELECT * FROM Burger WHERE user_id = ?';

  connection.query(query, userId, (error, results) => {
    // MANAGE ERROR
    error ? callback(error, null) : callback(null, results);
  });
}

function createBurger(burgerData, callback) {
  const query = 'INSERT INTO Burger SET ?';

  connection.query(query, burgerData, (error, results) => {
    // MANAGE ERROR
    error ? callback(error, null) : callback(null, results);
  });
}

function updateBurger(burgerId, changes, callback) {
  const query = 'UPDATE Burger SET ? WHERE burger_id = ?';

  connection.query(query, [ changes, burgerId ], (error, result) => {
    // MANAGE ERROR
    error ? callback(error, null) : callback(null, result);
  });
}

const deleteBurger = (burgerId, callback) => {
  const deleteRankingQuery = 'DELETE FROM ranking WHERE burger_id = ?';
  const deleteBurgerQuery = 'DELETE FROM burger WHERE burger_id = ?';

  connection.query(deleteRankingQuery, burgerId, (error, result) => {
    if (error) {
      callback(error, null);
      return;
    }

    connection.query(deleteBurgerQuery, burgerId, (error, result) => {
      if (error) {
        callback(error, null);
        return;
      }
    });
  });
};



module.exports = {
  getAllBurgers,
  getBurgerById,
  getIngredients,
  getRanking,
  getBurgersByUserId,
  createBurger,
  updateBurger,
  deleteBurger
};
