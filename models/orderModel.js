const { Order, User } = require('../database/database')
require('dotenv').config()

module.exports = {
    addOrder: async (order) => {
        try {
            const query = await Order.create(order)
            return query
        } catch (err) {
            return err
        }
    },
    getOrders: async (filter) => {
        try {
            let orderInfo = []
            // If customer, get customer's orders
            if(filter) {
                const user = await User.find(filter)
                let userOrdersIDS = user[0].orderHistory;
                const allOrders = await Order.find()
                for(let i = 0; i < allOrders.length; i++) {
                    for(let x = 0; x < userOrdersIDS.length; x++) {
                        if(userOrdersIDS[x] == allOrders[i]._id.toString()) {
                            orderInfo.push(allOrders[i]) 
                        }
                    }
                }
            } 
            // else, is admin and gets all orders
            else {
                orderInfo = await Order.find()
            }   
        return orderInfo
        } catch (err) {
            return err
        }
    },

    clear: async () => {
        return await Order.deleteMany({}, { multi: true })
    },
}