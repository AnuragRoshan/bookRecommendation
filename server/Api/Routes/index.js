const router = require("express").Router();


const userController = require("../Controller/userApi");



router.post("/register", userController.registerUser);
router.post("/update", userController.updateDb);
router.post("/login", userController.loginUser);
router.post("/toggleBookmark", userController.toggleBookmark);
router.post("/postComment", userController.postComment);

// router.get("/logedinuser", userController.userDetails);
router.get("/books/:minAge/:maxAge", userController.getBooksByAge);
router.get("/getbook/:id", userController.getBook);
router.get("/getLikedBook", userController.getLikedBook);
router.get("/getComment/:bookId", userController.getComment);

module.exports = router;