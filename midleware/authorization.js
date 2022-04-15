const db = require("../config/db");

const authorization = async(req, res, next) => {
    const idReflections = req.params.id;
    const owner_id = req.id;
    const select = "SELECT * FROM reflections WHERE id = $1";

    await db
        .query(select, [idReflections])
        .then((result) => {
            let idReflections;
            result.rows.forEach((userr) => {
                idReflections = userr.owner_id;
            });
            if (!result.rows.length) {
                res.status(401).json({
                    message: "Reflections Not Found",
                });
            } else if (idReflections !== owner_id) {
                return res.status(402).json({
                    message: `User id with ${owner_id} not match with this reflections`,
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