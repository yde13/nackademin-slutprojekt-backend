const orderRouter = require('express').Router();
const orderController = require('../controllers/orderController');

const {authorization}  = require('../middlewares/authorization')
const {authAllowVisitor} = require('../middlewares/authAllowVisitor')

orderRouter.post('/', authAllowVisitor, orderController.addOrder)
orderRouter.get('/', authorization, orderController.getOrders)

module.exports = orderRouter