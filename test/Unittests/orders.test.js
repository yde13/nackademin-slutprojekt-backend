const chai = require('chai')
const { disconnect } = require('../../database/database')
const { expect } = require('chai')
const { connect } = require('mongoose')
const orderModel = require('../../models/orderModel')
const authenticationModel = require('../../models/authenticationModel')

describe('Test order API models', () => {
    it('Should add an order with products to DB', async () => {
        let response = await orderModel.addOrder()
        expect(response).to.be.an('object')
    })

    it('Should get all orders from API with admin login', () => {
        let response = await orderModel.getOrder()
        expect(response).to.be.an('object')
    })

    it('Should get specific orders with customer login', () => {
        let response = await orderModel.getOrder()
        expect(response).to.be.an('object')
    })
})

