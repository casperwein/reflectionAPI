const db = require("../config/db");

exports.getReflections = async(req, res) => {
    const owner_id = req.id;
    const queryGet = "SELECT * FROM reflections WHERE owner_id = $1";
    await db
        .query(queryGet, [owner_id])
        .then((reflections) => {
            if (!reflections.rows.length) {
                res.status(200).json({
                    message: `User with id ${owner_id} have not reflections`,
                });
            }
            res.status(200).json({
                message: "ALL REFLECTIONS",
                data: reflections.rows,
            });
        })
        .catch((e) => {
            console.log(e);
            req.status(503).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
};

exports.postReflections = async(req, res) => {
    const body = req.body;
    const owner_id = req.id;
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;

    const create =
        "INSERT into reflections (success, low_point, take_away, owner_id) VALUES ($1, $2, $3, $4) returning *";
    await db
        .query(create, [success, low_point, take_away, owner_id])
        .then((reflections) => {
            res.status(201).json({
                status: "SUCCESS",
                message: "Reflection Successfully Created",
                data: reflections.rows,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                status: "FAIL",
                message: "INTERNAL SERVER ERROR",
            });
        });
};

exports.updateReflections = (req, res) => {
    const id = req.params.id;
    const success = req.body.success;
    const low_point = req.body.low_point;
    const take_away = req.body.take_away;
    const update =
        "UPDATE reflections SET success = $1, low_point = $2, take_away = $3 WHERE id = $4 returning * ";
    db.query(update, [success, low_point, take_away, id])
        .then((reflections) => {
            res.status(200).json({
                message: "UPDATE SUCCES",
                reflections: reflections.rows,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                status: "FAIL",
                message: "INTERNAL SERVER ERROR",
            });
        });
};

exports.deleteReflections = (req, res) => {
    const id = req.params.id;
    const queryDelete = "DELETE FROM reflections WHERE id = $1";
    db.query(queryDelete, [id])
        .then(() => {
            res.status(200).json({
                message: "DELETED SUCCES",
            });
        })
        .catch((e) => {
            res.status(503).json({
                status: "FAIL",
                message: "INTERNAL SERVER ERROR",
            });
        });
};