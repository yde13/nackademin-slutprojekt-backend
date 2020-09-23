const chai = require('chai')
chai.should()
const {disconnect, connect} = require('../../database/database')
const { expect, request } = require('chai')
const chaiHttp = require('chai-http')
const orderModel = require('../../models/orderModel')
const { getTestOrders } = require('../testdata')
const app = require('../../app.js')

describe('Integration test for orders', () => {   
    let orders; 
    before(async () => {
        await db.connect()
        orders = await getTestOrders()
    })

    it('Should test out api order POST route',  async () => {
        const query = await request(app)
            .post('/orders')
            .set()
    })

    after(async () => {
        await db.disconnect()
    })
})