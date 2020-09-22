const { Router } = require("express");

const controller = require('../controllers/productsController');

const { authorization } = require('../middlewares/authorization')


const router = new Router()

router.get('/products', controller.getProductsController)
router.get('/products/:id', controller.getSingleProductController)
router.post('/products', authorization, controller.addProductsController)
router.patch('/products/:id', authorization, controller.editProductsController)
router.delete('/products/:id', authorization, controller.deleteProductsController)

module.exports = router