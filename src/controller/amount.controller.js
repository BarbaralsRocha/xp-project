const userService = require('../service/user.service');

const deposit = async (req, res, next) => {
    const { valor, codCliente } = req.body
    try{
        await userService.amount(valor, codCliente, 'deposit');
        return res.status(201).json(req.body);
    } catch (e){
        console.log(e);
        next(e);
    }
};

const withdraw = async (req, res, next) => {
    const { valor, codCliente } = req.body
    try{
        await userService.amount(valor, codCliente, 'withdraw');
        return res.status(200).json(req.body);
    } catch (e){
        console.log(e);
        next(e);
    }
};

const amount = async (req, res, next) => {
    try{
        const result = await userService.getAmount(req.params.id);
        return res.status(200).json({ codCliente: req.params.id, saldo: result});
    } catch (e){
        console.log(e);
        next(e);
    }
};


module.exports = { deposit, withdraw, amount };