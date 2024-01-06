const router = require("express").Router();


const userController = require("../Controller/userApi");
const auth = require("../Middleware/auth");




router.post("/register", userController.registerUser);
router.post("/update", userController.updateDb);
router.post("/login", userController.loginUser);
router.post("/toggleBookmark", userController.toggleBookmark);
router.post("/postComment", userController.postComment);
router.post("/logout", userController.logout);

// router.get("/logedinuser", userController.userDetails);
router.get("/books/:minAge/:maxAge", userController.getBooksByAge);
router.get("/getbook/:id", userController.getBook);
router.get("/getLikedBook/:id", userController.getLikedBook);
router.get("/getComment/:bookId", userController.getComment);
router.get('/getUser', auth, userController.getUser);
router.get('/recomBook/:book', userController.getRecom);
router.get('/search/:bookName', userController.getSearch);


module.exports = router;