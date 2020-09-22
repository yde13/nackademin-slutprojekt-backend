const orderRouter = require('express').Router();
const orderController = require('../controllers/orderController');
const {authorization}  = require('../middlewares/authorization')

orderRouter.post('/', authorization, orderController.addOrder)
orderRouter.get('/', authorization, orderController.getOrders)

module.exports = orderRouter