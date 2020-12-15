const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { login, register } = require('./controllers/user');
const { validationLogin, validationRegister } = require('./validation/user');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routerUser } = require('./routes/user');
const { router, routerDelete, routerCreate } = require('./routes/article');

//const { validationAuthorization } = require('./validation/autorization');

const app = express();

const { PORT = 3000, MONGODB = 'mongodb://localhost:27017/newsdb' } = process.env;

mongoose.connect( MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(requestLogger);
app.post('/signup', validationRegister, register);
app.post('/signin', validationLogin, login);
app.use(/* validationAuthorization, */ auth);
app.use(routerUser);
app.use(router);
app.use(routerCreate);
app.use(routerDelete);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
