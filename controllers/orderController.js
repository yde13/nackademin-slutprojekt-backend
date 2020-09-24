const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel')
const productsModel = require('../models/productsModel')

module.exports = {
    addOrder: async (req, res) => {
        const calcSumResult = await productsModel.calcOrderSum(req.body.items)
        const order = {
            timeStamp: Date.now(),
            status: 'inProcess',
            items: req.body.items,
            orderValue: calcSumResult
        }

        const response = await orderModel.addOrder(order)
        if (response) {
            if (req.user) {
                const addToUser = await userModel.addUserOrder(response._id.toString(), req.user.userId)
            }
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }

    },
    getOrders: async (req, res) => {
        let response;
        if (req.user.isAdmin()) {
            response = await orderModel.getOrders()
        } else if (req.user.isCustomer()) {
            response = await orderModel.getOrders({ _id: req.user.userId })
        }

        if (response) {
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }
    }
}