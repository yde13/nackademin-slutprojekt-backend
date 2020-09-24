const authenticationRouter = require('express').Router();
const authenticationController = require('../controllers/authenticationController');

authenticationRouter.post('/', authenticationController.login);

module.exports = authenticationRouter