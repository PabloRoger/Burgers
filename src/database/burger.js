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

// function createBurger(burgerData, callback) {
//   const {
//     user_id,
//     burger_name,
//     bread_type,
//     meat_type,
//     cheese_type,
//     sauce_type,
//     vegetable_type,
//     toppings_type,
//     description,
//     picture
//   } = burgerData;


//   const query = 'INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//   // const values = [
//   //   burgerData.user_id,
//   //   burgerData.burger_name,
//   //   burgerData.bread_type,
//   //   burgerData.meat_type,
//   //   burgerData.cheese_type,
//   //   burgerData.sauce_type,
//   //   burgerData.vegetable_type,
//   //   burgerData.toppings_type,
//   //   burgerData.description,
//   //   burgerData.picture
//   // ];

//   const values = [user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture];

//   connection.query(query, values, (error, results) => {
//     if (error) {
//       callback(error, null);
//     } else {
//       callback(null, results);
//     }
//   });
// }



/*TODO - fix this function*/
function createBurger(burgerData, callback) {
  const query = 'INSERT INTO Burger SET ?';

  connection.query(query, burgerData, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  getAllBurgers,
  getBurgerById,
  createBurger
};
