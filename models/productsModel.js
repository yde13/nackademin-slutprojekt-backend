const { Products } = require('../database/database');

module.exports = {

    getProductsModel: async () => {
        try {
            const products = await Products.find({});
            return products
        } catch (error) {
            return error
        }
    },

    getSingleProductModel: async (id) => {
        try {
            let product = await Products.find({ _id: id });
            return product
        } catch (error) {
            return error
        }
    },

    addProductsModel: async (product) => {
        try {
            const item = await Products.create(product);
            return item
        } catch (error) {
            return error
        }
    },

    editProductsModel: async (id, product) => {
        try {
            const item = await Products.updateOne({ _id: id }, { $set: product });
            return item
        } catch (error) {
            return error
        }
    },

    deleteProductsModel: async (id) => {
        try {
            const removed = await Products.deleteOne({_id : id});
            return removed
        } catch (error) {
            return error
        }
    },

    clear: async () => {
        Products.deleteMany({}, {multi: true})
    }
}