const db = require("../config/db").pool;
const bcrypt = require("bcrypt");
const generateToken = require("../midleware/authentication").generateToken;

exports.register = async(req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    await db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => {
            if (result.rows.length) {
                res.status(402).json({
                    message: "email already exist",
                });
                console.log(result);
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                db.query(
                    "INSERT INTO users (email, password) values($1, $2) returning *", [email, hash]
                ).then((result) => {
                    const token = generateToken({
                        id: result.rows[0].id,
                        email: email,
                    });
                    res.status(200).json({
                        token: token,
                    });
                });
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
            });
        });
};

exports.login = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    await db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((user) => {
            if (!user.rows.length) {
                return res.status(400).json({
                    message: "email not found",
                });
            }
            console.log(user);
            const isValid = bcrypt.compareSync(password, user.rows[0].password);
            if (!isValid) {
                return res.status(401).send({
                    message: "email and password not match",
                });
            }
            const token = generateToken({
                id: user.rows[0].id,
                email: user.rows[0].email,
            });
            return res.status(200).send({
                status: "SUKSES",
                token: token,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
            });
        });
};