// const jwt = require('jsonwebtoken');
// // const JWT_SECRET = require('../utils/jwt');
// const UnauthorizedError = require('../errors/UnauthorizedError');

// const JWT_SECRET = 'IAMSECRETPASSWORD';

// const isAuth = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;
//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//     req.userId = jwt.decode(token).id;
//   } catch (err) {
//     next(new UnauthorizedError('Ошибка. Необходима авторизация'));
//     return;
//   }
//   req.user = payload;
//   next();
// };

// module.exports = isAuth;

const jwt = require('jsonwebtoken');

const { REACT_APP_NODE_ENV, REACT_APP_JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, REACT_APP_NODE_ENV === 'production' ? REACT_APP_JWT_SECRET : 'some-secret-key');
    req.userId = jwt.decode(token).id;
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
