const burgersService = require("../services/burgersService");

const getAllBurgers = (req, res) => {
    const allBurgers = burgersService.getAllBurgers();
    res.send("Get all the burgers");
};

const getBurgerById = (req, res) => {
    const oneBurger = burgersService.getBurgerById(req.params.id);
    res.send(`Get a burger with id: ${req.params.id}`);
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