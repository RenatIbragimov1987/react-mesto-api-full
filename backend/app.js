/* eslint-disable no-console */
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const isAuth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const { login, createUser } = require('./controllers/users');
const { users } = require('./routes/users');
const { cards } = require('./routes/cards');
const NotFoundDataError = require('./errors/NotFoundDataError');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(cookieParser());

app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(http|https):\/\/(www)?\.?([A-Za-z0-9.-]+)\.([A-z]{2,})((?:\/[+~%/.\w-_]*)?\??(?:[-=&;%@.\w_]*)#?(?:[\w]*))?/),
  }),
}), createUser);

app.use(isAuth);

app.use('/', users);
app.use('/', cards);

app.use((req, res, next) => {
  next(new NotFoundDataError('Запрошен несуществующий маршрут'));
  next();
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT} порт`);
});
