const model = require('../models/productsModel');
const fs = require('fs');
const path = require('path');




module.exports = {

    getProductsController: async (req, res) => {
        const product = await model.getProductsModel()

        res.json(product)
    },

    getSingleProductController: async (req, res) => {
        let id = req.params.id

        let profuct = await model.getSingleProductModel(id)
        console.log('hm');
        res.json(profuct)
    },

    addProductsController: async (req, res) => {
        try {
            const product = {
                title: req.body.title,
                price: req.body.price,
                shortDesc: req.body.shortDesc,
                longDesc: req.body.longDesc,
                imgFile: req.body.imgFile
                // imgFile: fs.readFileSync(path.join(process.cwd() + '/public/img/' + req.body.imgFile)) //lös detta bror
            }
            
            let result = await model.addProductsModel(product)
            console.log(result);

            res.json({product:result})
        } catch (error) {
            console.log(error);
            
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
        res.json(updatedProduct);
    },

    deleteProductsController: async (req, res) => {
        let id = req.params.id;
        let deleted = await model.deleteProductsModel(id)
        res.json({data: deleted})
    },
}


