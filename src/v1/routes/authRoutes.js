const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/user_profile/'));
    //cb(null, '/img/user_profile/');
  },
  filename: function(req, file, cb) {
    const userId = req.params.userId; // Este será el parámetro desde la ruta
    // el nombre del archivo será user_<userId>.<extensión>
    cb(null, `user_${userId}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // 5MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

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

module.exports = router;
