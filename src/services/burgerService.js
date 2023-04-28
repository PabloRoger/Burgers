const burger = require("../database/burger")

const getAllBurgers = (callback) => {
  const allBurgers = burger.getAllBurgers(callback);
  return allBurgers;
}

const getBurgerById = (burgerId, callback) => {
  const oneBurger = burger.getBurgerById(burgerId, callback);
  return oneBurger;
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
    throw error;
  }
}

const updateBurger = (burgerId, changes, callback) =>{
  try {
    const updatedBurger = burger.updateBurger(burgerId, changes, callback);
    return updatedBurger;
  } catch (error) {
    console.log(error);
    throw { status: 500, message: 'Error updating burger: ' + error.message }
  }
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