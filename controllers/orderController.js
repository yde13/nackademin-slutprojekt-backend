const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel')
const productsModel = require('../models/productsModel')

module.exports = {
    addOrder: async (req, res) => {
        try {
            const calcSumResult = await productsModel.calcOrderSum8(req.body.items)
            console.log(calcSumResult);
            const order = {
                timeStamp: Date.now(), 
                status: 'inProcess',
                items: req.body.items,
                orderValue: calcSumResult
            }

            const response = await orderModel.addOrder(order)
            if (response) {
                const addToUser = await userModel.addUserOrder(response._id.toString(), req.user.userId)
                res.status(200).json(response)
            } else {
                res.status(400).json(response)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getOrders: async (req, res) => {
        try {
            let response;
            if(req.user.isAdmin()) {
                response = await orderModel.getOrders()
            } else if(req.user.isCustomer()) {
                response = await orderModel.getOrders({_id: req.user.userId})
            } else if(req.user.isVisitor({})) {
                res.status(407)
            }
           
            if (response) {
                res.status(200).json(response)
            } else {
                res.status(400).json(response)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}