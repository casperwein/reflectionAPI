const db = require("../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../midleware/authentication").generateToken;

exports.signup = async(req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    await db.query(
        "SELECT * FROM users WHERE email = $1", [email],
        (err, user) => {
            if (user.rows.length) {
                res.status(402).json({
                    message: "email already exist",
                });
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            db.query(
                "INSERT INTO users (email, password) values($1, $2)", [email, hash],
                (err, result) => {
                    if (err) {
                        res.status(401).json(err);
                    }
                    const token = generateToken({
                        email: email,
                    });
                    res.status(200).json({
                        message: "registration succes",
                        email: email,
                        token: token,
                    });
                }
            );
        }
    );
};

exports.signIn = async(req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    await db.query(
        "SELECT * FROM users WHERE email = $1", [email],
        (err, user) => {
            if (!user.rows.length) {
                res.status(400).json({
                    message: "email not found",
                });
            }
            let userPassword, user_id, user_email;
            user.rows.forEach((userr) => {
                userPassword = userr.password;
                user_id = userr.id;
                user_email = userr.email;
            });
            const isValid = bcrypt.compareSync(password, userPassword);
            if (!isValid) {
                return res.status(401).send({
                    message: "email and password not match",
                });
            }
            const token = generateToken({
                id: user_id,
                email: user_email,
            });
            res.status(200).send({
                status: "SUKSES",
                token: token,
            });
        }
    );
};