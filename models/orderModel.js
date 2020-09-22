const { Order, User } = require('../database/database')
const bcrypt = require('bcryptjs')
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
            if(filter) {
                console.log('Customer');
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
            else {
                console.log('Admin');
                orderInfo = await Order.find()
            }   
        console.log(orderInfo);
        return orderInfo
        } catch (err) {
            console.log(err);
            return err
        }
    }
}