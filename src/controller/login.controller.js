const authentication = require('../utils/generateToken');

const login = async (req, res, next) => {
    try{
        const token = await authentication(req.body);
        return res.status(200).json({ token });
    } catch(e) {
        console.log(e);
        next(e);
    }
};

module.exports = login;