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
            const removed = await Products.deleteOne({ _id: id });
            return removed
        } catch (error) {
            return error
        }
    },

    clear: async () => {
        return await Products.deleteMany({}, { multi: true })
    },

    calcOrderSum: async (productsArray) => {
        let totalSum = 0;
        // get price for each product in the order, then return sum
        try {
            let products = await Products.find();
            for (let i = 0; i < products.length; i++) {
                for (let x = 0; x < productsArray.length; x++) {
                    if (products[i]._id == productsArray[x]) {
                        totalSum += products[i].price
                    }
                }
            }
            return totalSum
        } catch (error) {
            return error
        }
    }
}