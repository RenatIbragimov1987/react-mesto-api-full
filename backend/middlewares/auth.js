const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

const isAuth = async (req, res, next) => {
  // console.log('reqCookies', req.cookies);
  const token = req.cookies.jwt;

  let payload;
  try {
    // при продакшене используем JWT_SECRET
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    // console.log('payload', payload);
    req.userId = jwt.decode(token).id;
    // console.log('userId', req.userId);
  } catch (err) {
    // console.log('isAuth.err', err);
    next(new UnauthorizedError('Ошибка. Необходима авторизация'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
module.exports = isAuth;
