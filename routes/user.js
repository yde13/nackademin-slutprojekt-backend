const userRouter = require('express').Router();
const userController = require('../controllers/userController');
// const {authorization} = require('../middlewares/authorization')

// userRouter.get('/:userId', authorization, userController.getUser);

// userRouter.get('/', userController.getUsers);

// userRouter.get('/gdpr/:userId', authorization, userController.getUserAll);

userRouter.post('/', userController.addUser);

// userRouter.delete('/:userId', authorization, userController.deleteUser);

// userRouter.get('/:userId/todos', authorization, userController.getUserTodos)

// userRouter.patch('/:userId', authorization, userController.updateUser)

module.exports = userRouter