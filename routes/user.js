const userRouter = require('express').Router();
const userController = require('../controllers/userController');

userRouter.post('/', userController.addUser);

module.exports = userRouter