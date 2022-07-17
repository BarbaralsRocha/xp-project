const activeService = require('../service/active.service');

const getByActives = async (req, res) => {
    try{
        const result = await activeService.getActivesById(req.params.id);
        console.log(result)
        return res.status(200).json(result);
    } catch (e){
        console.log(e)
        return res.status(401).json({ message: 'Erro inesperado' })
    }
};

module.exports = getByActives;