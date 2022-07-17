
const { Transaction, Active, User } = require('../database/models');
const userService = require('./user.service');
const activeService = require('./active.service');

const sale = async (id, codAtivo, type, qtdeAtivos, conta) => {
    const findActive = await Active.findByPk(codAtivo);
    const { quantity, price } = findActive.dataValues;

    const findUser = await User.findByPk(id);
    const { balance, account } = findUser.dataValues;

    if(account !== conta){
        throw new Error(JSON.stringify({ status: 401, message: 'Conta inválida' }));
    }
    checkWallet(qtdeAtivos, id)
    
    userService.updateWalletUser(qtdeAtivos * price, balance, id, 'sale')
    activeService.updateQuantityActives((quantity + qtdeAtivos), codAtivo)

    return Transaction.create({
    userId: id,
    activeId: codAtivo,
    type,
    quantity: qtdeAtivos
})
};

const checkWallet = async (qtdeAtivos, id) => {
    const result = await Transaction.findAll({
    where: { userId: id }
}
        );
    const getQuantity = await Promise.all(result.map((el) => el.quantity))
    const amountActives = getQuantity.reduce((acc,cv) => acc + cv ,0)
    if(qtdeAtivos > amountActives) {
        throw new Error(JSON.stringify({ status: 401, message: 'Quantidade de ativos excedido' }));
    }
}


module.exports = sale