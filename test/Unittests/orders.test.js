const chai = require('chai')
const { disconnect } = require('../../database/database')
const { expect } = require('chai')
const { connect } = require('mongoose')
const orderModel = require('../../models/orderModel')
const authenticationModel = require('../../models/authenticationModel')

describe('Test order models', () => {
    it('Should add an order with products to DB', async () => {
        let response = await orderModel.addOrder()
        expect(response).to.be.an('object')
        expect(response.nModified).to.equal(1)
    })

    it('Should get all orders', () => {
        let response = await orderModel.getOrders()
        expect(response).to.be.an('array')
        expect(response[0]).to.have.keys('_id', 'timeStamp', 'status', 'items', 'orderValue')
    })
})

