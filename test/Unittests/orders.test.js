const chai = require('chai')
const { disconnect } = require('../../database/database')
const { expect } = require('chai')
const { connect } = require('mongoose')
const orderModel = require('../../models/orderModel')
const authenticationModel = require('../../models/authenticationModel')

describe('Test order models', () => {
    it('Should add an order with products to DB', async () => {
        const order = {
            timeStamp: Date.now(), 
            status: 'inProcess',
            items: [],
            orderValue: 999,
        }
        let response = await orderModel.addOrder(order)
        expect(response._doc).to.be.an('object')
        expect(response._doc).to.have.keys('_id', 'timeStamp', 'status', 'items', 'orderValue', '__v')
    })

    it('Should get all orders', async () => {
        let response = await orderModel.getOrders()
        expect(response).to.be.an('array')
        expect(response[0]._doc).to.have.keys('_id', 'timeStamp', 'status', 'items', 'orderValue', '__v')
    })
})