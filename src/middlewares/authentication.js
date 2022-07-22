const { authenticateToken } = require('../utils/JWTToken');

const authenticationMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    const [, auth] = token.split(' ');
    // Lógica para funcionar tanto no swagger, quanto na requisição local
    let payload;
    if(token && !auth) {
        payload = await authenticateToken(token);
    } else if (!token && auth){
        payload = await authenticateToken(auth);
    } else if (token && auth){
        payload = await authenticateToken(auth);
    }

    res.locals.payload = payload;

    next();
};

module.exports = authenticationMiddleware; 