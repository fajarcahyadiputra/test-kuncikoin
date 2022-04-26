const { User } = require('../models')
const Joi = require('joi');
const ErrorResponse = require('../utils/ErrorResponse');
const bcrypt = require('bcrypt')
const jwtAuth = require('../helpers/authHelper');
const {
    JWT_PRIVATE_KEY,
    JWT_EXPIRED
} = process.env;

module.exports = {
    login: async (req, res, next) => {
        try {
            const body = req.body;
            const schema = Joi.object({
                password: Joi.string().required(),
                email: Joi.string().email().required(),
            });

            // schema options
            const options = {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true
            };
            const { error, value } = schema.validate(req.body, options);

            if (error) {
                return next(new ErrorResponse(error.details, 401));
            } else {
                const user = await User.findOne({
                    where: {
                        username: body.username
                    }
                })
                if (!user) {
                    return next(new ErrorResponse('Your Email is Wrong', 401));
                }
                const compare = await bcrypt.compare(body.password, user.password);
                if (!compare) {
                    return next(new ErrorResponse('Your Password is Wrong', 401));
                }
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_PRIVATE_KEY, { expiresIn: JWT_EXPIRED });
                res.json(
                    {
                        statusCode: 200,
                        body: {
                            status: "success",
                            token: token
                        }
                    }
                )
            }
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    },
    register: async (req, res, next) => {
        try {
            const dataBody = req.body;
            const schema = Joi.object({
                password: Joi.string().required(),
                name: Joi.string().required(),
                confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
                    "any.only": "Confirm password must be match with password"
                }),
                email: Joi.string().email().required(),
            });

            // schema options
            const options = {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true
            };
            const { error, value } = schema.validate(req.body, options);



            if (error) {
                return next(new ErrorResponse(error.details, 401));
            } else {
                const countEmail = await User.count({ where: { email: dataBody.email } });
                if (countEmail > 0) {
                    return next(new ErrorResponse('Email duplicated', 400));
                }
                dataBody.password = await bcrypt.hash(dataBody.password, 10);
                const newUser = await User.create(dataBody);
                // on success replace req.body with validated value and trigger next middleware function
                res.status(201).json({
                    status: 'success',
                    message: 'Successfully inserting',
                    data: newUser,
                    token: jwtAuth(newUser.id)
                })
                next();
            }

        } catch (error) {
            console.log(error.message);
            next(error)
        }
    },
    refreshToken: async (req, res) => {

    }
}