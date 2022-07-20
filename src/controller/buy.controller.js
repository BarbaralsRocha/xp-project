const buyService = require('../service/buy.service');
require('express-async-errors');

const buy = async (req, res,next) => {
    const { id } = res.locals.payload
    const { codAtivo, qtdeAtivos, conta } = req.body;
    const type = 'buy'
    try{
        await buyService(id, codAtivo, type, qtdeAtivos, conta);
        return res.status(201).json({ codCliente: id, codAtivo, qtdeAtivos });
    } catch (e){
        console.log(e);
        next(e);
    }
};

module.exports = buy;