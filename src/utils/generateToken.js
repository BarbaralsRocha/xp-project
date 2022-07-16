const { User } = require('../database/models');
const { generateJWTToken } = require('./JWTToken');
const authentication = async ({ email, password }) => {
    const getUser = await User.findOne({
        where: { email, password },
    });

    if (!getUser) {
        throw new Error(JSON.stringify({ status: 400, message: 'Invalid fields' }));
    }

    const token = generateJWTToken(getUser.dataValues);
    return token ;
};

module.exports = authentication;
