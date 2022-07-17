const { Active } = require('../database/models');

const updateQuantityActives = (restQuantity, codAtivo) => Active.update(
    {
    quantity: restQuantity
    },
    {
    where: { id: codAtivo}
});

const getActivesById = async (id) => {
    const actives = await Active.findByPk(id)
    const { quantity, price } = actives.dataValues;
    return {
        codAtivo: id,
        qtdeAtivos: quantity,
        valor: price,
    }
};
// const getClientsById = async (id) => {
//     const todos = await Transaction.findByPk({
//        where: {
//             [Op.and]: [
//                 { type: 'buy' }, 
//                 { userId: id },
//             ],
//         },
//         include: [{
//             model: User, as: 'user', through: { attributes: [] }
//         }]
//     })
// console.log(todos)
// };

module.exports = { updateQuantityActives, getActivesById }

