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

const updateWalletUser = async(amount, balance, id, type) =>{
    let rest;
    if(type === 'buy'){
        rest = balance - amount;
    }
    rest = balance + amount;
    User.update(
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
        throw new Error(JSON.stringify({ status: 401, message: 'Usuário nao encontrado' }));
    }
    const { balance } = findUser.dataValues
    let sum;
    if(type === 'withdraw'){
        sum = balance - valor
        if(sum < 0) {
            throw new Error(JSON.stringify({ status: 401, message: 'Saldo indisponível' }));
        }
    }
    sum = balance + valor;
    User.update(
        {
        balance: sum,
        },
        {
        where: { id: codCliente }
})
    return true;
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
    getAmount
}; 

    