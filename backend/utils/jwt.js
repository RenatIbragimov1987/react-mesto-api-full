// const JWT_SECRET = 'IAMSECRETPASSWORD';
// const jwt = require('jsonwebtoken');

// const getToken = async (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
// module.exports = {
//   getToken,
//   JWT_SECRET,
// };

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// JSON Web Token
// JSON объект закодированный с помощью секрета JWT_SECRET (пока простой как в тренажере)

const getToken = async (id) => jwt.sign({ id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '365d' });

module.exports = { getToken };
