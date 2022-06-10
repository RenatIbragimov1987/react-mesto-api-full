// const JWT_SECRET = 'IAMSECRETPASSWORD';
// const jwt = require('jsonwebtoken');

// const getToken = async (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
// module.exports = {
//   getToken,
//   JWT_SECRET,
// };

const jwt = require('jsonwebtoken');

const { REACT_APP_NODE_ENV, REACT_APP_JWT_SECRET } = process.env;

// JSON Web Token
// JSON объект закодированный с помощью секрета JWT_SECRET (пока простой как в тренажере)

const getToken = async (id) => jwt.sign({ id }, REACT_APP_NODE_ENV === 'production' ? REACT_APP_JWT_SECRET : 'efed42a609a1be1e1ba62ba374dd21e324364d309a998156a2bee646bd541cc0', { expiresIn: '7d' });

module.exports = { getToken };
