const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

const isAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  try {
    // при продакшене используем JWT_SECRET
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    req.userId = jwt.decode(token).id;
  } catch (err) {
    next(new UnauthorizedError('Ошибка. Необходима авторизация'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
module.exports = isAuth;
