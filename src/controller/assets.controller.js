const activeService = require('../service/active.service');

const getAssetsClients = async (req, res, next) => {
    try{
        const result = await activeService.assetsClientsById(req.params.id);
        console.log(result)
        return res.status(200).json(result);
    } catch (e){
        console.log(e);
        next(e);
    }
};

const getAssetsById = async (req, res, next) => {
    try{
        const result = await activeService.getAssetsById(req.params.id, 'buy');
        return res.status(200).json(result);
    } catch (e){
        console.log(e);
        next(e);
    }
};

module.exports = { getAssetsClients, getAssetsById };