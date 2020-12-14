const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.validationCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string(),
    title: Joi.string(),
    text: Joi.string(),
    date: Joi.string(),
    source: Joi.string(),
    link: Joi.string().custom((value, helpers) => {
      if(validator.isURL(value)){
        return value;
      }
      return helpers.message('Url не валидно!')
    }),
    image: Joi.string().custom((value, helpers) => {
      if(validator.isURL(value)){
        return value;
      }
      return helpers.message('Url не валидно!')
    }),
  }),
});
module.exports.validationDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});
