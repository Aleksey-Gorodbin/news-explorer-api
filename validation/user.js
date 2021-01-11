const { celebrate, Joi } = require('celebrate');

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validationRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
});
