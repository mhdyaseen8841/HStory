const jwt = require('jsonwebtoken');
const generateFpassToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '10m',
    });
};


module.exports = generateFpassToken;