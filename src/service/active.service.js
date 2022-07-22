const { Active } = require('../database/models');
const dbAssetsCLients = require('../db/model/assetsByClient.model')

const updateQuantityAssets = (restQuantity, codAtivo) => Active.update(
    {
        quantity: restQuantity
    },
    {
        where: { id: codAtivo}
    });
    
    const getAssetsById = async (id) => {
        const assets = await Active.findByPk(id)

        if(!assets) throw new Error(JSON.stringify({ status: 409, message: 'Ativo não encontrado' }))
        const { quantity, price } = assets;
        return {
            codAtivo: Number(id),
            qtdeAtivos: quantity,
            valor: Number(price),
        }
    };
    
    const assetsClientsById = async (id) => {
        const type = 'buy'
        const result = await dbAssetsCLients.assetsByClient(id, type)
        if(result.length === 0) throw new Error(JSON.stringify({ status: 401, message: 'Usuário não encontrado' }))
        const resultado = await Promise.all(result.map((el) => {
        return {
        codCliente: el.userId,
        codAtivo: el.assetsId,
        qtdeAtivos: el.quantity,
        valor: Number(el.price),
        }
    }))
    return resultado
}

module.exports = { updateQuantityAssets, getAssetsById, assetsClientsById }

