const burgersService = require("../services/burgerService");

const getAllBurgers = (req, res) => {
  const getAllBurgers = burgersService.getAllBurgers((error, result) => {
    error ? res.status(500).send(error) : res.send(result);
  });

  return getAllBurgers;
  };

const getBurgerById = (req, res) => {
  const { id } = req.params;

  if(!id){
    res.status(400).send("Missing required information");
    return;
  }

  const getOneBurger = burgersService.getBurgerById(id, (error, result) => {
      error ? res.status(500).send(error) : res.send(result);
  });

  return getOneBurger;
};

const createBurger = (req, res) => {
  const { body } = req;

  if(
    !body.user_id ||
    !body.burger_name ||
    !body.bread_type ||
    !body.meat_type ||
    !body.cheese_type ||
    !body.sauce_type ||
    !body.vegetable_type ||
    !body.toppings_type ||
    !body.description ||
    !body.picture
    ){
    res.status(400).send("Missing required information");
    return;
  }

  const newBurger = {
    user_id: body.user_id,
    burger_name: body.burger_name,
    bread_type: body.bread_type,
    meat_type: body.meat_type,
    cheese_type: body.cheese_type,
    sauce_type: body.sauce_type,
    vegetable_type: body.vegetable_type,
    toppings_type: body.toppings_type,
    description: body.description,
    picture: body.picture
  };

  const createdBurger = burgersService.createBurger(newBurger, (error, result) => {
    error ? res.status(500).send(error) : res.send(result);
  });

  return createdBurger;
};

const updateBurger = (req, res) => {
  const { body } = req;
  const burger_id = req.params.id;

  if( !burger_id ){
    res.status(400).send("Missing required information");
    return;
  }

  burgersService.updateBurger(burger_id, body, (error, result) => {
    if (error) {
      console.log(error)
      res.status(500).json({ error: error.message })
      return;
    }

    res.json(result);
  });
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