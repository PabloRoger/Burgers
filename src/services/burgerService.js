const burger = require("../database/burger")

const getAllBurgers = (callback) => {
  const allBurgers = burger.getAllBurgers(callback);
  return allBurgers;
}

const getBurgerById = (burgerId, callback) => {
  const oneBurger = burger.getBurgerById(burgerId, callback);
  return oneBurger;
}

const getIngredients = (callback) => {
  const ingredients = burger.getIngredients(callback);
  return ingredients;
}

const getRanking = (callback) => {
  const ranking = burger.getRanking(callback);
  return ranking;
}

const getBurgersByUserId = (userId, callback) => {
  const burgersByUserId = burger.getBurgersByUserId(userId, callback);
  return burgersByUserId;
}

const createBurger = (burgerData, callback) =>{
  const burgerToInsert = {
    // Spread operator to copy all properties from burgerData
    ...burgerData
  };

  try {
    const createdBurger = burger.createBurger(burgerToInsert, callback);
    return createdBurger;
  } catch (error) {
    throw { status: 500, message: 'Error creating burger: ' + error.message }
  }
}

const updateBurger = (burgerId, changes, callback) =>{
  try {
    const updatedBurger = burger.updateBurger(burgerId, changes, callback);
    return updatedBurger;
  } catch (error) {
    throw { status: 500, message: 'Error updating burger: ' + error.message }
  }
}

const deleteBurger = (burgerId, callback) =>{
  try {
    burger.deleteBurger(burgerId, callback);
  } catch (error) {
    throw { status: 500, message: 'Error deleting burger: ' + error.message }
  }
}

module.exports = {
  getAllBurgers,
  getBurgerById,
  getIngredients,
  getRanking,
  getBurgersByUserId,
  createBurger,
  updateBurger,
  deleteBurger
}