const { Transaction, Active, User } = require('../database/models');
const userService = require('./user.service');
const activeService = require('./active.service');

const buy = async (id, codAtivo, type, qtdeAtivos, conta) => {
    const findActive = await Active.findByPk(codAtivo);
    const { quantity, price } = findActive.dataValues;

    const findUser = await User.findByPk(id);
    const { balance, account } = findUser.dataValues;

    if(account !== conta) throw new Error(JSON.stringify({ status: 401, message: 'Conta inválida' }));

    if(qtdeAtivos > quantity) throw new Error(JSON.stringify({ status: 401, message: 'Qtde de ativos excedido' }));

    await activeService.updateQuantityAssets((quantity - qtdeAtivos), codAtivo)
    await userService.updateWalletUser(qtdeAtivos * price, balance, id, 'buy')

    return Transaction.create({
    userId: id,
    assetsId: codAtivo,
    type,
    quantity: qtdeAtivos
})};


module.exports = buy