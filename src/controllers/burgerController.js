const burgersService = require("../services/burgerService");

// function to get all burgers
const getAllBurgers = (req, res) => {
  const getAllBurgers = burgersService.getAllBurgers((error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return getAllBurgers;
};


// function to get a burger by id
const getBurgerById = (req, res) => {
  const { id } = req.params;

  if(!id){
    res.status(400).send("Missing required information");
    return;
  }

  const getOneBurger = burgersService.getBurgerById(id, (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return getOneBurger;
};


// function to get burgers by user id
const getBurgersByUserId = (req, res) => {
  const { id } = req.params;

  if(!id){
    res.status(400).send("Missing required information");
    return;
  }

  const getBurgersByUserId = burgersService.getBurgersByUserId(id, (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return getBurgersByUserId;
};


// function to get the ingredients of burgers
const getIngredients = (req, res) => {
  const getIngredients = burgersService.getIngredients((error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return getIngredients;
};


// function to get the ranking of burgers
const getRanking = (req, res) => {
  const getRanking = burgersService.getRanking((error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return getRanking;
};


// function to create a burger
const createBurger = (req, res) => {
  const { body } = req;
  const uploadedPicture = req.file ? req.file.filename : null;

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
    !uploadedPicture ||
    !body.time_to_prepare ||
    !body.difficulty
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
    picture: uploadedPicture,
    time_to_prepare: body.time_to_prepare,
    difficulty: body.difficulty
  };

  const createdBurger = burgersService.createBurger(newBurger, (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send({ redirectURL: `/burger/${result.insertId}` });
  });

  return createdBurger;
};


// function to update a burger
const updateBurger = (req, res) => {
  const { body } = req;
  const burger_id = req.params.id;

  if( !burger_id ){
    res.status(400).send("Missing required information");
    return;
  }

  const updatedBurger = burgersService.updateBurger(burger_id, body, (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return updatedBurger;
};


// function to delete a burger
const deleteBurger = (req, res) => {
  const {id} = req.params;

  if (!id) {
    res.status(400).send("Missing required information");
    return;
  }

  const deletedBurger = burgersService.deleteBurger(id, (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message })
      return;
    }

    res.send(result);
  });

  return deletedBurger;
};


module.exports = {
    getAllBurgers,
    getBurgerById,
    getIngredients,
    getBurgersByUserId,
    getRanking,
    createBurger,
    updateBurger,
    deleteBurger
};