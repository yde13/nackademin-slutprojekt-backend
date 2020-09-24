const chai = require('chai')
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const {disconnect, connect} = require('../../database/database')
const expect = chai.expect
const authenticationModel = require('../../models/authenticationModel')
const userModel = require('../../models/userModel')
const orderModel = require('../../models/orderModel')
const { getTestOrders, getTestUsers } = require('../testdata')
const app = require('../../app.js')

describe('Integration test for orders', () => {   
    let orders; 
    let currentUser;
    before(async () => {
        await connect()
    })
    beforeEach(async () => {
        await orderModel.clear();

        orders = await getTestOrders()
        let users = await getTestUsers()
        let loginObject = {
            email: users[2].email,
            password: users[2].password
        }
        await userModel.addUser(users[2])
        currentUser = await authenticationModel.login(loginObject)    
        
        await orderModel.addOrder(orders[0])        
    })

    it('Should test out api order POST route without being logged in',  async () => {
        const query = await chai.request(app)
            .post('/api/orders')
            .send(orders[0])
            expect(query).to.have.status(200)
            expect(query.body).to.be.an("object")
    })

    it('Should test out api order POST route while logged in',  async () => {
        const query = await chai.request(app)
            .post('/api/orders')
            .set('Authorization', `Bearer ${currentUser.token}`)
            .send(orders[0])
            expect(query).to.have.status(200)
            expect(query.body).to.be.an("object")
    })

    it('Should get all existing orders',  async () => {
        const query = await chai.request(app)
            .get('/api/orders')
            .set('Authorization', `Bearer ${currentUser.token}`)
            expect(query).to.have.status(200)            
            expect(query.body[0]).to.have.keys('items', '_id', 'timeStamp', 'status', 'orderValue', '__v')
    })

    after(async () => {
        await disconnect()
    })
})