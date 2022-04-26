const router = require("express").Router();
const userController = require("../controller/user-controller");
const { userValidation } = require("../midleware/validation");

router.post("/register", userValidation, userController.signup);
router.post("/login", userValidation, userController.signIn);

module.exports = router;