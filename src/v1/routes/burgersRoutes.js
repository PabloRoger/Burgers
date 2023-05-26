const express = require("express");
const router = express.Router();
const burgersController = require("../../controllers/burgerController");

const multer = require('multer');
const path = require('path');

// Variable externa para almacenar el valor de index
let index = 0;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/user_burger/'));
  },
  filename: function(req, file, cb) {
    index++;
    cb(null, `burger_${index}${path.extname(file.originalname)}`);
  }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // 5MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg/;
        // mimetype is the type of the file (image/jpeg, image/png, etc)
        const mimetype = filetypes.test(file.mimetype);
        // extname is the extension of the file (.jpeg, .png, etc)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // if minetype and extname are true, continue with the upload
        // cb(null, true) means no error, and continue with the upload
        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(new Error(`Solo se permiten archivos de tipo .jpeg/.jpg`));
    }
});

router
    .get("/burgers", burgersController.getAllBurgers)
    .get("/burger/:id", burgersController.getBurgerById)
    .get("/burger/user/:id", burgersController.getBurgersByUserId)
    .get("/ranking", burgersController.getRanking)
    .get("/ingredients", burgersController.getIngredients)
    .post("/create", upload.single('picture'), burgersController.createBurger)
    .patch("/update/:id", burgersController.updateBurger)
    .delete("/delete/:id", burgersController.deleteBurger);

module.exports = router;
