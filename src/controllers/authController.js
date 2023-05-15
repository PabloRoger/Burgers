const authService = require("../services/authService");


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


const getUserByEmail = (req, res) => {
  const { email } = req.params;

  const user = authService.getUserByEmail(email, (error, result) => {
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
      res.status(500).send({ error: error.message });
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
      res.status(500).send({ error: error.message })
      return;
    }

    res.redirect("/login");
  });

  return createdUser;
}


const updateUser = (req, res) => {
  const { body } = req;
  const { userId } = req.params;

  const updatedUser = authService.updateUser(userId, body, (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return updatedUser;
}


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
  getUserByEmail,
  authenticateUser,
  registerUser,
  updateUser,
  deleteUser
};