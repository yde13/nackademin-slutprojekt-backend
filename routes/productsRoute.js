const { Router } = require("express");

const controller = require('../controllers/productsController');

const router = new Router()

router.get('/products', controller.getProductsController)
router.get('/products/:id', controller.getSingleProductController)
router.post('/products', controller.addProductsController)
router.patch('/products/:id', controller.editProductsController)
router.delete('/products/:id', controller.deleteProductsController)

module.exports = router