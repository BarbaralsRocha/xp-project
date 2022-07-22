require('express');
require('express-async-errors');
const { User, Deposit } = require('../database/models');

const createUser = async ({
    name,
    email,
    password,
    cpf,
    balance,
    account,
}) => {
    const getUser = await findUser(
        email,
        password,
        cpf,
        account)
    if(getUser) throw new Error(JSON.stringify({ status: 409, message: 'Usuário já possui uma conta existente' }))
    return User.create({
    name,
    email,
    password,
    cpf,
    balance,
    account,
    })
};

const findUser = async (
    email,
    password,
    cpf,
    account,) => {
    const getUser = await User.findOne({
        where: { email, password, cpf, account },
    });
    return getUser;
}

const getUsers = () => User.findAll({
    attributes: { exclude: ['password'] } });

const updateWalletUser = async(amount, balance, id, type) =>{
    let rest;
    if(type === 'buy'){
        rest = balance - amount;
    }
    rest = balance + amount;
    return User.update(
        {
        balance: rest,
        },
        {
        where: { id }
})
}
const amount = async (valor, codCliente, type) => {
    const findUser = await User.findByPk(codCliente);
    if (!findUser) {
        throw new Error(JSON.stringify({ status: 409, message: 'Usuário nao encontrado' }));
    }
    const { balance } = findUser.dataValues
    let sum;
    if(type === 'withdraw'){
        sum = balance - valor
        if(sum < 0) {
            throw new Error(JSON.stringify({ status: 422, message: 'Saldo insuficiente' }));
        }
    }
    sum = balance + valor;
    Deposit.create({
        userId: codCliente,
        type,
        quantity: valor,
    })
    return User.update(
        {
        balance: sum,
        },
        {
        where: { id: codCliente }
})
}

const getAmount = async (codCliente) => {
    const findUser = await User.findByPk(codCliente);
    if (!findUser) {
        throw new Error(JSON.stringify({ status: 401, message: 'Usuário nao encontrado' }));
    }
    const { balance } = findUser.dataValues
    return balance
}

module.exports = {
    createUser,
    getUsers,
    updateWalletUser,
    amount,
    getAmount,
    findUser
}; 

    