const jwt = require("jsonwebtoken");
const privatKey = "secret";

const verify = (req, res, next) => {
    const token = req.headers["auth"];
    jwt.verify(token, privatKey, (err, endcoded) => {
        if (err) {
            return res.status(401).send({
                err,
            });
        }
        req.user = decoded.user;
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