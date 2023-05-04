const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

router
    .get("/auth/users", authController.getAllUsers)
    .get("/auth/user/:email", authController.getUserByEmail)
    .post("/auth/login", authController.authenticateUser)
    .post("/auth/register", authController.registerUser)
    .patch("/auth/user/:userId", authController.updateUser)
    .delete("/auth/user/:userId", authController.deleteUser);

module.exports = router;
