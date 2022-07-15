/* eslint-disable no-unused-vars */
const { User } = require('../database/models');
const { generateJWTToken } = require('./JWTToken');
const authentication = async ({ 
    _name,
    _email,
    _password,
    cpf,
    _balance,
    _account 
}) => {
    const getUser = await User.findOne({
        where: { cpf },
    });

    if (!getUser) {
        throw new Error(JSON.stringify({ status: 400, message: 'Invalid fields' }));
    }

    const token = generateJWTToken(getUser.dataValues);
    return { token };
};

module.exports = authentication;
