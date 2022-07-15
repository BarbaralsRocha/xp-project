// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    const erroHandler = JSON.parse(err.message);
        return res.status(erroHandler.status || 500).json({ 
            message: erroHandler.message || 'Erro inesperado',
        }); 
    };
    
    module.exports = errorHandler;