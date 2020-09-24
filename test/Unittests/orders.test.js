const chai = require('chai')
chai.should()
const {disconnect, connect} = require('../../database/database')
const { expect } = require('chai')
const orderModel = require('../../models/orderModel')
const {getTestOrders} = require('../testdata')

describe('Test order models', () => {

    let order;
    before(async function() {
        await connect();
    })

    beforeEach(async () => {
        await orderModel.clear()
        order = await getTestOrders()
        await orderModel.addOrder(order[0])
    })

    it('Should add an order with products to DB', async () => {
        let response = await orderModel.addOrder(order[0])
        expect(response._doc).to.be.an('object')
        expect(response._doc).to.have.keys('_id', 'timeStamp', 'status', 'items', 'orderValue', '__v')
        expect(response._doc.items[0]).to.be.an('string')
    })

    it('Should get all orders', async () => {
        let response = await orderModel.getOrders()
        expect(response).to.be.an('array')
        expect(response[0]._doc).to.have.keys('_id', 'timeStamp', 'status', 'items', 'orderValue', '__v')
    }) 

    after(async function () {
        await disconnect()
    });   
})