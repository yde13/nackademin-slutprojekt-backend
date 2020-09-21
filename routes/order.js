const orderRouter = require('express').Router();
const orderController = require('../controllers/orderController');

orderRouter.post('/', orderController.addOrder)
orderRouter.get('/', orderController.getOrders)

module.exports = orderRouter