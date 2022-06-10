// const JWT_SECRET = 'IAMSECRETPASSWORD';
// const jwt = require('jsonwebtoken');

// const getToken = async (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
// module.exports = {
//   getToken,
//   JWT_SECRET,
// };

const jwt = require('jsonwebtoken');

const { REACT_APP_NODE_ENV, REACT_APP_JWT_SECRET } = process.env;

const getToken = async (id) => jwt.sign({ id }, REACT_APP_NODE_ENV === 'production' ? REACT_APP_JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

module.exports = { getToken };
