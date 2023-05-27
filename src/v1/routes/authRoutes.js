const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files
const multer = require('multer');
// path is a module for working with file paths
const path = require('path');

// multer.diskStorage() creates a storage space for storing files in the server
const storage = multer.diskStorage({
  // destination is a function that specifies the folder where the files will be stored
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/user_profile/'));
  },
  // filename is a function that renames the file
  filename: function(req, file, cb) {
    const userId = req.params.userId;
    cb(null, `user_${userId}${path.extname(file.originalname)}`);
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
    .get("/auth/users", authController.getAllUsers)
    .get("/auth/user/:id", authController.getUserById)
    .post("/auth/login", authController.authenticateUser)
    .post("/auth/register", authController.registerUser)
    .patch("/auth/user/update/:userId", upload.single('picture'), authController.updateUser)
    .delete("/auth/user/:userId", authController.deleteUser);

  /**
   * upload.single('picture') is a middleware that handles the upload process
   * single() means that only one file will be uploaded
   * 'picture' is the name of the input field in the form
   */

module.exports = router;
