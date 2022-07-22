
const { Transaction, Active, User } = require('../database/models');
const userService = require('./user.service');
const activeService = require('./active.service');

const sale = async (id, codAtivo, type, qtdeAtivos, conta) => {
    const findAsset = await Active.findByPk(codAtivo);
    const { quantity, price } = Object.values(findAsset)[0];
    const findUser = await User.findByPk(id);
    const { balance, account } = Object.assign(findUser);
    if(account !== conta){
        throw new Error(JSON.stringify({ status: 401, message: 'Conta inválida' }));
    }
    
    const amountAssets = await checkQuantityAssets(id)

        if(qtdeAtivos > amountAssets) {
            throw new Error(JSON.stringify({ status: 401, message: 'Qtde de ativos excedido' }))
        }

    userService.updateWalletUser(qtdeAtivos * price, balance, id, 'sale')
    activeService.updateQuantityAssets((quantity + qtdeAtivos), codAtivo)

    return Transaction.create({
    userId: id,
    assetsId: codAtivo,
    type,
    quantity: qtdeAtivos
})
};

const checkQuantityAssets = async (id) => {
    const result = await Transaction.findAll({
        where: { userId: id }
    }
            );
    const getQuantity = await Promise.all(result.map((el) => el.quantity))
    const amountAssets = getQuantity.reduce((acc,cv) => acc + cv ,0)
    return amountAssets;
}

module.exports = { sale, checkQuantityAssets }