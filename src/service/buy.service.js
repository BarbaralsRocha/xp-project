const { Transaction, Active, User } = require('../database/models');
const userService = require('./user.service');
const activeService = require('./active.service');

const buy = async (id, codAtivo, type, qtdeAtivos, conta) => {
    const findActive = await Active.findByPk(codAtivo);
    const { quantity, price } = findActive.dataValues;

    const findUser = await User.findByPk(id);
    const { balance, account } = findUser.dataValues;

    if(account !== conta){
        throw new Error(JSON.stringify({ status: 401, message: 'Conta inválida' }));
    }

    if(qtdeAtivos > quantity) {
        throw new Error(JSON.stringify({ status: 401, message: 'Quantidade de ativos excedido' }));
    }

    activeService.updateQuantityActives((quantity - qtdeAtivos), codAtivo)
    userService.updateWalletUser(qtdeAtivos * price, balance, id, 'buy')

    return Transaction.create({
    userId: id,
    activeId: codAtivo,
    type,
    quantity: qtdeAtivos
})};


module.exports = buy