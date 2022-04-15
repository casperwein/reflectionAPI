const router = require("express").Router();
const userController = require("../controller/user-controller");

router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);

module.exports = router;