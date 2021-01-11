const router = require('express').Router();
const routerCreate = require('express').Router();
const routerDelete = require('express').Router();
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/article');
const {
  validationCreateArticle, validationDeleteArticle,
} = require('../validation/article');

router.get('/articles', getArticles);
routerCreate.post('/articles', validationCreateArticle, createArticle);
routerDelete.delete('/articles/:articleId', validationDeleteArticle, deleteArticle);

module.exports = {
  router,
  routerDelete,
  routerCreate,
};
