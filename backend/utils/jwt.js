// const { JWT_SECRET } = process.env;
// const jwt = require('jsonwebtoken');

// const getToken = async (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
// module.exports = {
//   getToken,
//   JWT_SECRET,
// };

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const getToken = async (id) => jwt.sign({ id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d', sameSite: 'none' });

module.exports = { getToken };
