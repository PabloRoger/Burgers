const authService = require("../services/authService");
const bcrypt = require("bcryptjs");

// Get all users from the database
const getAllUsers = (req, res) => {
  // call the service function, passing the necessary callback function
  const users = authService.getAllUsers((error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return users;
}

// Get a single user by id from the database
const getUserById = (req, res) => {
  // get the id from the request parameters (auth/user/:id)
  const { id } = req.params;

  const user = authService.getUserById(id, (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return user;
}

// Authenticate a user
const authenticateUser = (req, res) => {
  const { username, password } = req.body;

  authService.authenticateUser(username, password, (error, result) => {
    if (error) {
      /**
       * If there is an error, redirect the user to the login page
       * and display the error message in the query string
       * encodeURIComponent() is used to encode special characters
       * e.g. ?error=Usuario%20no%20encontrado
       */
      const errorMessage = encodeURIComponent(error.message);
      res.redirect(`/login?error=${errorMessage}`);
      return;
    }
    // If there is no error, save the user in the session using spread operator to add the username
    req.session.user = {
      ...result,
      username: username
    };

    res.redirect("/");
  });
};

// Register a new user
const registerUser = (req, res) => {
  const { body } = req;

  // Check if the required fields are present
  if(!body.username || !body.email || !body.password || !body.passwordConfirmation){
    res.status(400).send("No se ha proporcionado la información necesaria");
    return;
  }

  // Check if the passwords match
  const createdUser = authService.registerUser(body, (error, result) => {
    if (error) {
      res.status(500).send({ redirect: "/register", error: error.message })

      return;
    }

    res.redirect("/login");
  });

  return createdUser;
}

// Update a user
const updateUser = (req, res) => {
  const { user_id, username, email, password, new_password } = req.body;
  // If a new picture is uploaded, save the filename in the database if not, save null
  const uploadedPicture = req.file ? req.file.filename : null;

  //get the user from the database to check if the password is correct
  authService.getUserById(user_id, (error, user) => {
    if (error) {
      res.status(500).send({ error: error.message });
      return;
    }

    // Check if the password is correct
    authService.authenticateUser(user.username, password, (error, result) => {
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      // If the password is correct, update the user
      const changes = {
        picture: uploadedPicture || user.picture, // Keep the old picture if no new one is uploaded
        username: username,
        email: email,
        /**
         * if new_password is provided, hash it, otherwise keep the old password
         * bcrypt.hashSync() is used to hash the password
         * bcrypt.genSaltSync() is used to generate a salt
         * salt is a random string that is added to the password before hashing it
         */
        password: new_password ? bcrypt.hashSync(new_password, bcrypt.genSaltSync(10)) : user.password
      };

      // Call the service function to update the user
      authService.updateUser(user_id, changes, (error, result) => {
        if (error) {
          res.status(500).send({ error: error.message });
          return;
        }

        // If the user is updated, redirect to the user profile
        res.send({ redirect: `/profile/${user_id}` });
      });
    });
  });
};

/**
 * Delete a user
 * It is created but not used in the project
 */
const deleteUser = (req, res) => {
  const { userId } = req.params;

  const deletedUser = authService.deleteUser(userId, (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return deletedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  authenticateUser,
  registerUser,
  updateUser,
  deleteUser
};