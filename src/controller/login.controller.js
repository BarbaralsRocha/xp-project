const authentication = require('../utils/generateToken');

const login = async (req, res, next) => {
    const { email } = req.body
    try{
        const token = await authentication(req.body);
        return res.status(200).json({ email,  token });
    } catch(e) {
        console.log(e);
        next(e);
    }
};

module.exports = login;