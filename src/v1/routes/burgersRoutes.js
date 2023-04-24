const express = require("express");
const router = express.Router();
const burgersController = require("../../controllers/burgerController");

router
    .get("/", burgersController.getAllBurgers)
    .get("/:id", burgersController.getBurgerById)
    .post("/:id", burgersController.createBurger)
    .patch("/:id", burgersController.updateBurger)
    .delete("/:id", burgersController.deleteBurger);

module.exports = router;
