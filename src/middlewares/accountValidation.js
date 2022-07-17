const Joi = require('joi');

const schema = Joi.object({
    codCliente: Joi.number().positive().required(),
    valor: Joi.number().positive().required()
}).required().messages({
    'any.required': '400|{{#label}} is required',
    'number.base': '422|{{#label}} must be a number',
});

const accountValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const [code, message] = error.message.split('|');
        return res.status(code).json({ message });
    }
    next();
};

module.exports = accountValidation;