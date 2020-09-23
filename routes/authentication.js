const authenticationRouter = require('express').Router();
const authenticationController = require('../controllers/authenticationController');

const { authorization } = require('../middlewares/authorization')

// authenticationRouter.get('/checkToken', authorization, authenticationController.checkToken);

authenticationRouter.post('/', authenticationController.login);


module.exports = authenticationRouter