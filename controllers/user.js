const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ErrorRequest = require('../errors/error-request');
const NotFoundError = require('../errors/not-found-error');
const ErrorConflict = require('../errors/conflict-error');
const ErrorAutorization = require('../errors/error-autorization');
const User = require('../models/user');
// Регистрация пользователя______________________________________________
module.exports.register = (req, res, next) => {
  const { name, email } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({ email: user.email, _id: user._id });
    })
    .catch((e) => {
      if (e.name === 'MongoError') {
        next(new ErrorConflict('Пользователь с таким email уже существует'));
        return;
      }
      next(new ErrorRequest('С запросом что-то не так'));
    });
};
// Аунтефикация пользователя______________________________________________
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((e) => {
      if (e.name === 'Error') {
        next(new ErrorAutorization('Неправильные почта или пароль'));
        return;
      }
      next(new ErrorRequest('С запросом что-то не так'));
    });
};
// Получения данных пользователя______________________________________________
module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      try {
        if (!user) {
          throw new NotFoundError('Нет пользователя с таким id');
        }
        res.send({ data: user });
      } catch (error) {
        throw new ErrorRequest('С запросом что-то не так');
      }
    })
    .catch(next);
};
