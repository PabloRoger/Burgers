const burgersService = require("../services/burgerService");

const getAllBurgers = (req, res) => {
    burgersService.getAllBurgers((error, results) => {
      error ? res.status(500).send(error) : res.send(results)
    });
  };

const getBurgerById = (req, res) => {
    burgersService.getBurgerById(req.params.id, (error, result) => {
        error ? res.status(500).send(error) : res.send(result);
    });
};

const createBurger = (req, res) => {
    const newBurger = burgersService.createBurger(req.body);
    res.send(`Create a new burger with id: ${req.params.id}`);
};

const updateBurger = (req, res) => {
    const updatedBurger = burgersService.updateBurger(req.params.id, req.body);
    res.send(`Update a burger with id: ${req.params.id}`);
};

const deleteBurger = (req, res) => {
    burgersService.deleteBurger(req.params.id);
    res.send(`Delete a burger with id: ${req.params.id}`);
};

module.exports = {
    getAllBurgers,
    getBurgerById,
    createBurger,
    updateBurger,
    deleteBurger
};