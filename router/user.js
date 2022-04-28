const router = require("express").Router();
const userController = require("../controller/user-controller");
const { userValidation } = require("../midleware/validation");

router.post("/register", userValidation, userController.register);
router.post("/login", userValidation, userController.login);

module.exports = router;