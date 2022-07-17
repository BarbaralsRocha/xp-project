const Joi = require('joi');

const schema = Joi.object({
    codAtivo: Joi.number().positive().required(),
    qtdeAtivos: Joi.number().positive().required(),
    conta: Joi.number().positive().required()
}).required().messages({
    'any.required': '400|{{#label}} is required',
    'number.base': '422|{{#label}} must be a number',
});

const investValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const [code, message] = error.message.split('|');
        return res.status(code).json({ message });
    }
    next();
};

module.exports = investValidation;