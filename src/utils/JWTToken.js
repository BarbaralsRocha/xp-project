const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-undef
const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '3600m',
    algorithm: 'HS256',
};

const generateJWTToken = (payload) => 
    jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
    if (!token) {
        throw new Error(JSON.stringify({ status: 401, message: 'Token não encontrado' }));
    }

    try {
        const introspection = jwt.verify(token, SECRET, jwtConfig);
        return introspection;
    } catch (e) {
        console.log('error', e.message);
        throw new Error(JSON.stringify({ status: 401, message: 'Token inválido ou expirado' }));
    }
};

module.exports = {
    generateJWTToken,
    authenticateToken,
}; 