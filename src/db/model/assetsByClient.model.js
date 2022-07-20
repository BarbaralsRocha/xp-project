/* Arquivo criado com o intuito de realizar a rota GET BY CLIENT(/ativos/{cod-cliente}).
Ao realizar a associação no sequelize, foi gerada uma ddl no MySql que foi possivel fazer corretamente a associação entre as tabelas User, Actives e Transactions, mas ao fazer a inclusão pelo proprio sequelize estava dando erro


Caso a associação estivesse funcionando pelo sequelize, a função getClientsById que seria realizada seria essa: 
// const getClientsById = async (id) => {
//     const getAllClientsTransactions = await Transaction.findAll({
//        where: {
//             [Op.and]: [
//                 { type: 'buy' }, 
//                 { userId: id },
//             ],
//         },
//         include: [{
//             model: Active, as: 'assets', through: { attributes: [] }
//         }]
//     })
//     const { assetsId, quantity, price } = getAllClientsTransactions.dataValues;
//     return {
//         codCliente: id,
//         codAtivo: assetsId,
//         qtdeAtivos: quantity,
//         valor: price,
//     }
// };
*/
const connection = require('../connection');

const getClientsById = async (id, type) => {
    const [result] = await connection.execute('SELECT * FROM steelInvestiment.Transactions t INNER JOIN steelInvestiment.Actives a ON a.id = t.assetsId WHERE t.userId = ? AND t.type = ?', [id, type])
    return result
}

module.exports = getClientsById;