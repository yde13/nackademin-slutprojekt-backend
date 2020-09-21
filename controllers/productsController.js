const model = require('../models/productsModel');

module.exports = {

    getProductsController: async (req, res) => {
        const product = await model.getProductsModel()

        if (product) {
            res.status(200).json(product)
        } else {
            res.status(401).json(product.msg)
        }
    },

    getSingleProductController: async (req, res) => {
        let id = req.params.id

        let product = await model.getSingleProductModel(id)

        if (product) {
            res.status(200).json(product)
        } else {
            res.status(401).json(product.msg)
        }
    },

    addProductsController: async (req, res) => {

        const product = {
            title: req.body.title,
            price: req.body.price,
            shortDesc: req.body.shortDesc,
            longDesc: req.body.longDesc,
            imgFile: req.body.imgFile
        }

        let result = await model.addProductsModel(product)

        if (result) {
            res.status(200).json({ product: result })
        } else {
            res.status(401).json(result.msg)
        }


    },

    editProductsController: async (req, res) => {
        var id = req.params.id;
        let product = {
            title: req.body.title,
            price: req.body.price,
            shortDesc: req.body.shortDesc,
            longDesc: req.body.longDesc,
            imgFile: req.body.imgFile,
        }
        const updatedProduct = await model.editProductsModel(id, product)

        if (updatedProduct) {
            res.status(200).json(updatedProduct)
        } else {
            res.status(401).json(updatedProduct.msg)
        }
    },

    deleteProductsController: async (req, res) => {
        let id = req.params.id;
        let deleted = await model.deleteProductsModel(id)

        if (deleted) {
            res.status(200).json({ data: deleted })
        } else {
            res.status(401).json(deleted.msg)
        }
    },
}


