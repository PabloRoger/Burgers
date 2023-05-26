const authService = require("../services/authService");
const bcrypt = require("bcryptjs");


const getAllUsers = (req, res) => {
  const users = authService.getAllUsers((error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return users;
}


const getUserById = (req, res) => {
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


const authenticateUser = (req, res) => {
  const { username, password } = req.body;

  authService.authenticateUser(username, password, (error, result) => {
    if (error) {
      const errorMessage = encodeURIComponent(error.message);
      res.redirect(`/login?error=${errorMessage}`);
      return;
    }
    req.session.user = {
      ...result,
      username: username
    };

    res.redirect("/");
  });
};




const registerUser = (req, res) => {
  const { body } = req;

  if(!body.username || !body.email || !body.password || !body.passwordConfirmation){
    res.status(400).send("Missing required information");
    return;
  }

  const createdUser = authService.registerUser(body, (error, result) => {
    if (error) {
      res.status(500).send({ redirect: "/register", error: error.message })

      return;
    }

    res.redirect("/login");
  });

  return createdUser;
}


const updateUser = (req, res) => {
  const { user_id, username, email, password, new_password } = req.body;
  const uploadedPicture = req.file ? req.file.filename : null;

  authService.getUserById(user_id, (error, user) => {
    if (error) {
      res.status(500).send({ error: error.message });
      return;
    }

    authService.authenticateUser(user.username, password, (error, result) => {
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      const changes = {
        picture: uploadedPicture || user.picture, // Keep the old picture if no new one is uploaded
        username: username,
        email: email,
        // if new_password is provided, hash it, otherwise keep the old password
        password: new_password ? bcrypt.hashSync(new_password, bcrypt.genSaltSync(10)) : user.password
      };

      authService.updateUser(user_id, changes, (error, result) => {
        if (error) {
          res.status(500).send({ error: error.message });
          return;
        }

        res.send(result);
      });
    });
  });
};





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