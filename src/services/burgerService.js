const burger = require("../database/burger")

const getAllBurgers = (callback) => {
  const allBurgers = burger.getAllBurgers(callback);
  return allBurgers;
}

const getBurgerById = (burgerId, callback) => {
  const oneBurger = burger.getBurgerById(burgerId, callback);
  return oneBurger;
}

const createBurger = (burgerData) =>{
  const burgerToInsert = {
    ...burgerData
  };

  try {
    const createdBurger = burger.createBurger(burgerToInsert);
  } catch (error) {
    throw error;
  }
}

const updateBurger = () =>{
  return;
}

const deleteBurger = () =>{
  return;
}

module.exports = {
  getAllBurgers,
  getBurgerById,
  createBurger,
  updateBurger,
  deleteBurger
}