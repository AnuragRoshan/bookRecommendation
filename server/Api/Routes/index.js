const router = require("express").Router();


const userController = require("../Controller/userApi");



router.post("/register", userController.registerUser);
router.post("/update", userController.updateDb);
router.post("/login", userController.loginUser);
router.get("/logedinuser", userController.userDetails);
router.get("/books/:minAge/:maxAge", userController.getBooksByAge);


module.exports = router;