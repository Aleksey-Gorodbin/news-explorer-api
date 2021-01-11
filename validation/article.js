const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.validationCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Url не валидно!');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Url не валидно!');
    }),
  }),
});
module.exports.validationDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
});
