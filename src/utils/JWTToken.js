const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-undef
const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const generateJWTToken = (payload) => 
    jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
    if (!token) {
        throw new Error(JSON.stringify({ status: 401, message: 'Token not found' }));
    }

    try {
        const introspection = jwt.verify(token, SECRET, jwtConfig);
        return introspection;
    } catch (e) {
        console.log('error', e.message);
        throw new Error(JSON.stringify({ status: 401, message: 'Expired or invalid token' }));
    }
};

module.exports = {
    generateJWTToken,
    authenticateToken,
}; 