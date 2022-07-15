const { User } = require('../database/models');

const createUser = async ({
    name,
    email,
    password,
    cpf,
    balance,
    account,
}) => User.create({
    name,
    email,
    password,
    cpf,
    balance,
    account,
});

const getUsers = () => User.findAll({
    attributes: { exclude: ['password'] } });

module.exports = {
    createUser,
    getUsers
}; 

    