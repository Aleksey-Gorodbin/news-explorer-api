const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const Forbidden = require('../errors/error-forbidden');
const ErrorRequest = require('../errors/error-request');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate('user')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const userId = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: userId,
  })
    .then((article) => {
      res.send({
        data: article,
      });
    })
    .catch(() => next(new ErrorRequest('С запросом что-то не так')));
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Нет статьи с таким id');
      } else if (article.owner.toString() !== req.user._id) {
        throw new Forbidden('Нельзя удалять чужие статьи');
      }
      article.remove();
      res.send({
        data: 'Статья удалена',
      });
    })
    .catch(next);
};
