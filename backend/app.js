const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const isAuth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { users } = require('./routes/users');
const { cards } = require('./routes/cards');
const NotFoundDataError = require('./errors/NotFoundDataError');

const app = express();

const accessCors = [
  'https://api.renat1987.nomoredomains.xyz',
  'http://api.renat1987.nomoredomains.xyz',
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
// const CORS_CONFIG = {
//   credentials: true,
//   method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   origin: [
//     'https://renat.domains.nomoredomains.sbs',
//     'http://renat.domains.nomoredomains.sbs',
//     'https://localhost:3001',
//     'http://localhost:3001',
//   ],
// };

// app.use(cors(CORS_CONFIG));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.use(cookieParser());
  // app.get('/', (req, res) => {
  //   res.send(req.body);
  // });
  app.use(express.json());

  app.use(requestLogger); // подключаем логгер запросов

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

  app.get('/signout', (req, res) => {
    res.status(200).clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    }).send({ message: 'Выход' });
  });

  // app.use(isAuth);

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
}

main();
