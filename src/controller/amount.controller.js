const userService = require('../service/user.service');

const deposit = async (req, res) => {
    const { valor, codCliente } = req.body
    try{
        const result = await userService.amount(valor, codCliente, 'deposit');
        if(result) return res.status(200).json(req.body);
        return res.status(401).json({ message: 'Usuário não encontrado' });
    } catch (e){
        console.log(e)
        return res.status(401).json({ message: 'Erro inesperado' })
    }
};

const withdraw = async (req, res) => {
    const { valor, codCliente } = req.body
    try{
        const result = await userService.amount(valor, codCliente, 'withdraw');
        if(result) return res.status(200).json(req.body);
        return res.status(401).json({ message: 'Usuário não encontrado' });
    } catch (e){
        console.log(e)
        return res.status(401).json({ message: 'Erro inesperado' })
    }
};

const amount = async (req, res) => {
    console.log('entrou')
    try{
        const result = await userService.getAmount(req.params.id);
        return res.status(200).json({ codCliente: req.params.id, saldo: result});
    } catch (e){
        console.log(e)
        return res.status(401).json({ message: 'Erro inesperado' })
    }
};


module.exports = { deposit, withdraw, amount };