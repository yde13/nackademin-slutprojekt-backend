const orderModel = require('../models/orderModel');

module.exports = {
    addOrder: async (req, res) => {
        try {
            const order = {
                timeStamp: Date.now(), 
                status: 'inProcess',
                items: req.body.items,
                orderValue: req.body.orderValue,
            }
            const response = await orderModel.addOrder(order)
            if (response) {
                res.status(200).send(response)
            } else {
                res.status(400).send(response)
            }
        } catch (err) {
            res.status(500).send(err)
        }
    },
    getOrders: async (req, res) => {
        try {
            const response = await orderModel.getOrders()
            if (response) {
                res.status(200).send(response)
            } else {
                res.status(400).send(response)
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
}