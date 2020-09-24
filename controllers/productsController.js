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
            res.status(401).json(product)
        }
    },

    addProductsController: async (req, res) => {
        const product = {
            title: req.body.title,
            price: req.body.price,
            shortDesc: req.body.shortDesc,
            longDesc: req.body.longDesc,
            imgFile: req.body.imgFile,
            serial: req.body.serial
        }
        
        if(req.user.isAdmin()) {            
            let result = await model.addProductsModel(product)
            res.status(200).json({product: result})
        } else {
            res.status(401).send('You are not an Admin.');
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
            serial: req.body.serial
        }

        if(req.user.isAdmin()) {            
            const updatedProduct = await model.editProductsModel(id, product)
            res.json({data: updatedProduct})
        } else {
            res.status(401).send('You are not an Admin.');
        }
    },

    deleteProductsController: async (req, res) => {
        let id = req.params.id;

        if(req.user.isAdmin()) {            
            let deleted = await model.deleteProductsModel(id)
            res.json({ data: deleted })
        } else {
            res.status(401).send('You are not an Admin.');
        }
    },
}


