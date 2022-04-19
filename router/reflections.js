const router = require("express").Router();
const reflectionsController = require("../controller/reflections-controller");
const verify = require("../midleware/authentication").verify;
const authorization = require("../midleware/authorization").authorization;

router.use(verify);
router.post("/postreflections", reflectionsController.postReflections);
router.get("/reflections", reflectionsController.getReflections);
router.delete(
    "/delete/:id",
    authorization,
    reflectionsController.deleteReflections
);
router.put(
    "/update/:id",
    authorization,
    reflectionsController.updateReflections
);

module.exports = router;