const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();



router.get("/countrycodes", UserController.getCode);

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.post("/reset", UserController.userReset);

router.post("/resetPassword", UserController.resetPassword);



module.exports = router;
