const routerUser = require('express').Router();

const { getUserInfo } = require('../controllers/user');

routerUser.get('/users/me', getUserInfo);

module.exports = { routerUser };
