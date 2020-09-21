const { Order } = require('../database/database')
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
    getOrders: async () => {
        try {
            const query = await Order.find()
            return query
        } catch (err) {
            return err
        }
    }
}