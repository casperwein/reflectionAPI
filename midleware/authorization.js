const db = require("../config/db").pool;

const authorization = async(req, res, next) => {
    const idReflections = req.params.id;
    const owner_id = req.id;
    const select = "SELECT * FROM reflections WHERE id = $1";

    await db
        .query(select, [idReflections])
        .then((result) => {
            let reflectionsOwner_id;
            result.rows.forEach((userr) => {
                reflectionsOwner_id = userr.owner_id;
            });
            if (!result.rows.length) {
                res.status(401).json({
                    message: "Reflections Not Found",
                });
            } else if (reflectionsOwner_id !== owner_id) {
                return res.status(402).json({
                    message: `User id  ${owner_id} not match with this reflections`,
                });
            } else {
                return next();
            }
        })
        .catch((e) => {
            res.status(503).json({
                status: "FAIL",
                message: "INTERNAL SERVER ERROR",
            });
        });
};

module.exports = { authorization };