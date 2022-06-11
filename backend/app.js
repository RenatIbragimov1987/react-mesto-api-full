// const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const isAuth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const { login, createUser } = require('./controllers/users');
const { users } = require('./routes/users');
const { cards } = require('./routes/cards');
const NotFoundDataError = require('./errors/NotFoundDataError');

const app = express();

const accessCors = [
  'https://renat.domains.nomoredomains.sbs',
  'http://renat.domains.nomoredomains.sbs',
  'http://localhost:3001',
];

const options = {
  origin: accessCors,
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(options));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});
// app.use(helmet());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send(req.body);
});
app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов;

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT} порт`);
});
