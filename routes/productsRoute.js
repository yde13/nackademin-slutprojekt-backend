const { Router } = require("express");
const controller = require('../controllers/productsController');

const { authorization } = require('../middlewares/authorization')

const router = new Router()

router.get('/', controller.getProductsController)
router.get('/:id', controller.getSingleProductController)
router.post('/', authorization, controller.addProductsController)
router.patch('/:id', authorization, controller.editProductsController)
router.delete('/:id', authorization, controller.deleteProductsController)

module.exports = router