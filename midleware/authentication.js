const jwt = require("jsonwebtoken");
const privatKey = "secret";

const verify = (req, res, next) => {
    const token = req.headers["x-access-token"];
    jwt.verify(token, privatKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                err: err,
            });
        }
        req.id = decoded.id;
        next();
    });
};

const generateToken = (payload) => {
    const token = jwt.sign(payload, privatKey, {
        algorithm: "HS256",
        expiresIn: "1H",
    });
    return token;
};

module.exports = { verify, generateToken };