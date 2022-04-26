const Joi = require("joi");

async function userValidation(req, res, next) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        res.status(401).json({
            msg: "input error",
            error: err.message,
        });
    }
}

async function reflectionsValidation(req, res, next) {
    const schema = Joi.object().keys({
        success: Joi.string().required(),
        low_point: Joi.string().required(),
        take_away: Joi.string().required(),
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        res.status(401).json({
            msg: "input error",
            error: err.message,
        });
    }
}

async function reflectionsById(req, res, next) {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
    });

    try {
        await schema.validateAsync(req.params);
        next();
    } catch (err) {
        res.status(401).json({
            msg: "input error",
            error: err.message,
        });
    }
}

module.exports = {
    userValidation,
    reflectionsValidation,
    reflectionsById,
};