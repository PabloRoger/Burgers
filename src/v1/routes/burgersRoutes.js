const express = require("express");
const router = express.Router();
const burgersController = require("../../controllers/burgerController");

// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files
const multer = require('multer');
// path is a module for working with file paths
const path = require('path');

// Variable externa para almacenar el valor de index
let index = 0;

// multer.diskStorage() creates a storage space for storing files in the server
const storage = multer.diskStorage({
  // destination is a function that specifies the folder where the files will be stored
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/user_burger/'));
  },
  // filename is a function that renames the file
  filename: function(req, file, cb) {
    index++;
    cb(null, `burger_${index}${path.extname(file.originalname)}`);
  }
});

// upload handles the upload process
const upload = multer({
    storage: storage,
    // fileSize requires a number in bytes (1MB = 1024 * 1024 bytes)
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

  /**
   * upload.single('picture') is a middleware that handles the upload process
   * single() means that only one file will be uploaded
   * 'picture' is the name of the input field in the form
   */
module.exports = router;
