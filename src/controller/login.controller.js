const authentication = require('../utils/generateToken');

const login = async (req, res) => {
    try{
        const token = await authentication(req.body);
        return res.status(200).json({ token });
    } catch(e) {
        console.log(e)
        return res.status(500).json({ message: 'Erro Inesperado' });
    }
};

module.exports = login;