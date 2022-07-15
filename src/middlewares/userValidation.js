const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'any.required': '400|{{#label}} is required',
        'string.min': '400|{{#label}} length must be at least 3 characters long',
    }),
    email: Joi.string().email().required().messages({
    'email.base': '400|{{#label}} must be a valid email',
    'string.email': '400|{{#label}} must be a valid email',
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': '400|{{#label}} is required',
        'string.min': '400|{{#label}} length must be at least 8 characters long',
    }),
    cpf: Joi.string().length(11).required().messages({
        'any.required': '400|{{#label}} is required',
        'string.min': '400|{{#label}} length must be 11 characters',
    }),
    balance: Joi.number().positive().required().messages({
        'any.required': '400|{{#label}} is required',
        'number.positive': '400|{{#label}} length must be positive',
    }),
    account: Joi.number().positive().required().messages({
        'any.required': '400|{{#label}} is required',
        'number.positive': '400|{{#label}} length must be positive',
    }),
}).required().messages({
    'any.required': '400|{{#label}} is required',
    'string.base': '400| {{#label}} must be a string',
    'number.base': '422|{{#label}} must be a number',
});

const userValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const [code, message] = error.message.split('|');
        return res.status(code).json({ message });
    }
    next();
};

module.exports = userValidation;