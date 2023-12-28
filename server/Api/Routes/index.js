const router = require("express").Router();


const userController = require("../Controller/userApi");



router.post("/register", userController.registerUser);



module.exports = router;