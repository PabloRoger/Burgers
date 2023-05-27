const connection = require('./connection');
const bcrypt = require('bcryptjs');

// GET ALL USERS
function getAllUsers(callback){
  const query = 'SELECT * FROM user';

  connection.query(query, (error, results) => {
    error ? callback(error, null) : callback(null, results);
  });
}

// GET USER BY ID
function getUserById(id, callback){
  const query = 'SELECT * FROM user WHERE user_id = ?';

  connection.query(query, id, (error, result) => {
    /**
     * the argument of the callback are (error, result)
     * - error: if there is an error, it will be here
     * - result: if there is no error, it will be here
     */

    error ? callback(error, null) : callback(null, result[0]);
  });
}

// AUTHENTICATION USER
function authenticateUser(username, password, callback) {
  const query = 'SELECT * FROM user WHERE username = ?';

  /**
   * Using async/await to wait for the bcrypt.compare() function to finish
   * before continuing with the execution of the code
   * async = the function will be asynchronous
   * await = wait for the function to finish
   */
  connection.query(query, username, async (error, result) => {
    if (error) {
      callback(error, null);
      return;
    }

    // If the user is not found, return an error message
    if (result.length === 0) {
      callback({ message: "Usuario no encontrado" }, null);
      return;
    }
    // user found
    let user = result[0];

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      callback({ message: "Contraseña incorrecta" }, null);
      return;
    }

    /**
     * reassing the username property of the user object
     * to the username argument of the function
     */
    user.username = username;
    // use callback to return the user object
    callback(null, user);
  });
}


// REGISTER USER
function registerUser(userData, callback) {
  const query = 'SELECT email FROM user WHERE email = ?';

  connection.query(query, userData.email, async (error, result) => {
    if (error) {
      callback(error, null);
      return;
    }

    // If the user is not found or the passwords don't match, return an error message
    if (result.length > 0) {
      callback({ message: "Email already registered" }, null);
      return;
    }else if(userData.password !== userData.passwordConfirmation){
      callback({ message: "Passwords don't match" }, null);
      return;
    }

    // hash the password
    let hashedPassword = await bcrypt.hash(userData.password, 8);

    // save the user in the database
    const query = 'INSERT INTO User SET ?';

    connection.query(query, { username: userData.username, email: userData.email, picture: "user.png" , password: hashedPassword }, (error, result) => {
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

// UPDATE USER
function updateUser(userId, changes, callback) {
  const query = 'UPDATE user SET ? WHERE user_id = ?';

  connection.query(query, [ changes, userId ], (error, result) => {
    error ? callback(error, null) : callback(null, result);
  });
}

// DELETE USER
function deleteUser(userId, callback) {
  const query = 'DELETE FROM user WHERE user_id = ?';

  connection.query(query, userId, (error, result) => {
    error ? callback(error, null) : callback(null, result);
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  authenticateUser,
  registerUser,
  updateUser,
  deleteUser
};