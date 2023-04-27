const burger = require("../database/burger")

const getAllBurgers = (callback) => {
  const allBurgers = burger.getAllBurgers(callback);
  return allBurgers;
}

const getBurgerById = (burgerId, callback) => {
  const oneBurger = burger.getBurgerById(burgerId, callback);
  return oneBurger;
}

const createBurger = () =>{
  return;
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