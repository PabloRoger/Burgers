const connection = require('./connection');
const bcrypt = require('bcryptjs');


function getAllUsers(callback){
  const query = 'SELECT * FROM User';
  connection.query(query, (error, results) => {
    error ? callback(error, null) : callback(null, results);
  });
}

function getUserByEmail(email, callback){
  const query = 'SELECT * FROM User WHERE email = ?';
  connection.query(query, email, (error, result) => {
    error ? callback(error, null) : callback(null, result[0]);
  });
}

function authenticateUser(username, password, callback) {
  const query = 'SELECT * FROM User WHERE username = ?';

  connection.query(query, username, async (error, result) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (result.length === 0) {
      callback({ message: "User not found" }, null);
      return;
    }

    let user = result[0];

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      callback({ message: "Incorrect password" }, null);
      return;
    }

    callback(null, { message: "User authenticated" });
  }
  );
}

function registerUser(userData, callback) {
  const query = 'SELECT email FROM User WHERE email = ?';
  connection.query(query, userData.email, async (error, result) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (result.length > 0) {
      callback({ message: "Email already registered" }, null);
      return;
    }else if(userData.password !== userData.passwordConfirmation){
      callback({ message: "Passwords don't match" }, null);
      return;
    }

    let hashedPassword = await bcrypt.hash(userData.password, 8);

    const query = 'INSERT INTO User SET ?';
    connection.query(query, { username: userData.username, email: userData.email, password: hashedPassword }, (error, result) => {
      if (error) {
        callback(error, null);
        return;
      }else{
        callback(null, { message: "User created" });
        return;
      }
    });
  });
}

function updateUser(userId, changes, callback) {
  const query = 'UPDATE User SET ? WHERE user_id = ?';
  connection.query(query, [ changes, userId ], (error, result) => {
    error ? callback(error, null) : callback(null, result);
  });
}

function deleteUser(userId, callback) {
  const query = 'DELETE FROM User WHERE user_id = ?';
  connection.query(query, userId, (error, result) => {
    error ? callback(error, null) : callback(null, result);
  });
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  authenticateUser,
  registerUser,
  updateUser,
  deleteUser
};