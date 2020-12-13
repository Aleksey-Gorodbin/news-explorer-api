const { celebrate, Joi } = require('celebrate');

module.exports.validationCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(2).max(30),
    title: Joi.string().min(2).max(30),
    text: Joi.string().min(2).max(30),
    date: Joi.string().min(2).max(30),
    source: Joi.string().min(2).max(30),
    link: Joi.string().pattern(/https?:\/\/(www\.)?[a-z0-9/\S+]#?/i),
    image: Joi.string().pattern(/https?:\/\/(www\.)?[a-z0-9/\S+]#?/i),
  }),
});
module.exports.validationDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});
