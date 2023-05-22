const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/user_profile/'));
    //cb(null, '/img/user_profile/');
  },
  filename: function(req, file, cb) {
    const userId = req.params.userId; // Este será el parámetro desde la ruta
    cb(null, `user_${userId}.jpg`);
  }
});

const upload = multer({ storage: storage });

router
    .get("/auth/users", authController.getAllUsers)
    .get("/auth/user/:id", authController.getUserById)
    .post("/auth/login", authController.authenticateUser)
    .post("/auth/register", authController.registerUser)
    .patch("/auth/user/update/:userId", upload.single('picture'), authController.updateUser)
    .delete("/auth/user/:userId", authController.deleteUser);

module.exports = router;
