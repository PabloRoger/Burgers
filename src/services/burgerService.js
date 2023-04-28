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
    // Spread operator to copy all properties from burgerData
    ...burgerData
  };

  try {
    const createdBurger = burger.createBurger(burgerToInsert);
    return createdBurger;
  } catch (error) {
    throw new error;
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