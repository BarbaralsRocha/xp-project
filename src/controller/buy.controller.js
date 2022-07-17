const buyService = require('../service/buy.service');

const buy = async (req, res) => {
    const { id } = res.locals.payload
    const { codAtivo, qtdeAtivos, conta } = req.body;
    const type = 'buy'
    try{
        await buyService(id, codAtivo, type, qtdeAtivos, conta);
        return res.status(200).json({ codCliente: id, codAtivo, qtdeAtivos });
    } catch (e){
        console.log(e)
        return res.status(401).json({ message: 'Quantidade de ativos excedido' })
    }
};

module.exports = buy;