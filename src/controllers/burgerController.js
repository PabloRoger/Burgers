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



/*TODO - fix this function*/
const createBurger = (req, res) => {
    const burgerData = req.body;

    burgersService.createBurger(burgerData, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error creating burger');
    } else {
      res.status(201).send(`Created a new burger with id: ${result.insertId}`);
    }
  });
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