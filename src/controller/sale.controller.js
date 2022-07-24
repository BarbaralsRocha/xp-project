const saleService = require('../service/sale.service');
require('express-async-errors');

const sale = async (req, res, next) => {
    const { id } = res.locals.payload
    const { codAtivo, qtdeAtivos, conta } = req.body;
    const type = 'sale'
    try{
        await saleService.sale(id, codAtivo, type, qtdeAtivos, conta);
        return res.status(201).json({ codCliente: id, codAtivo, qtdeAtivos });
    } catch (e){
        console.log(e);
        next(e);
        return res.status(401).json({ message: 'Qtde de ativos excedido' });
    }
};

module.exports = sale;