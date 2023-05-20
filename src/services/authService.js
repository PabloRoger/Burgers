const auth = require("../database/auth")

const getAllUsers = (callback) => {
  const users = auth.getAllUsers(callback);
  return users;
}

const getUserById = (id, callback) => {
  const user = auth.getUserById(id, callback);
  return user;
}

const authenticateUser = (username, password, callback) => {
  const authenticatedUser = auth.authenticateUser(username, password, callback);
  return authenticatedUser;
}

const registerUser = (dataUser, callback) => {
  const user = {
    ...dataUser
  };

  try {
    const createdUser = auth.registerUser(user, callback);
    return createdUser;
  } catch (error) {
    throw { status: 500, message: 'Error creating user: ' + error.message }
  }
}

const updateUser = (userId, changes, callback) => {
  const updatedUser = auth.updateUser(userId, changes, callback);
  return updatedUser;
}

const deleteUser = (userId, callback) => {
  const deletedUser = auth.deleteUser(userId, callback);
  return deletedUser;
}


module.exports = {
  getAllUsers,
  getUserById,
  authenticateUser,
  registerUser,
  updateUser,
  deleteUser
}