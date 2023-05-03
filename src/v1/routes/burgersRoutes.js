const express = require("express");
const router = express.Router();
const burgersController = require("../../controllers/burgerController");

router
    .get("/burgers", burgersController.getAllBurgers)
    .get("/burger/:id", burgersController.getBurgerById)
    .get("/ranking", burgersController.getRanking)
    .post("/create", burgersController.createBurger)
    .patch("/update/:id", burgersController.updateBurger)
    .delete("/delete/:id", burgersController.deleteBurger);

module.exports = router;
