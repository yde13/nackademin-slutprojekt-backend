const chai = require('chai')
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const {disconnect, connect} = require('../../database/database')
const expect = chai.expect
const orderModel = require('../../models/orderModel')
const { getTestOrders } = require('../testdata')
const app = require('../../app.js')

describe('Integration test for orders', () => {   
    let orders; 
    before(async () => {
        await connect()
        orders = await getTestOrders()
    })

    it('Should test out api order POST route without being logged in',  async () => {
        const query = await chai.request(app)
            .post('/api/orders')
            .set('Authorization', `Bearer `)
            .send(orders[0])

            console.log(query)
    })

    after(async () => {
        await disconnect()
    })
})