const { celebrate, Joi } = require('celebrate');

module.exports.validationAuthorization = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
  }),
});