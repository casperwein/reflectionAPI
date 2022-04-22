const router = require("express").Router();
const reflectionsController = require("../controller/reflections-controller");
const verify = require("../midleware/authentication").verify;
const authorization = require("../midleware/authorization").authorization;
const {
    reflectionsValidation,
    reflectionsById,
} = require("../midleware/validation");

router.use(verify);
router.post("/", reflectionsValidation, reflectionsController.postReflections);
router.get("/", reflectionsController.getReflections);
router.delete(
    "/:id",
    reflectionsById,
    authorization,
    reflectionsController.deleteReflections
);
router.put(
    "/:id",
    reflectionsById,
    authorization,
    reflectionsValidation,
    reflectionsController.updateReflections
);

module.exports = router;