require('dotenv').config()
const app = require('../../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request} = chai
chai.should()

const authenticationModel = require('../../models/authenticationModel')
const userModel = require('../../models/userModel')
const {getTestUsers} = require('../testdata')
const { connect,disconnect } = require('../../database/database')

describe('Integration tests for Users', function () {
    before(async function() {
        await connect()
        await userModel.clearAllUsers()
    })
    beforeEach(async function() {
        const users = await getTestUsers()
        const loginObject = {
            email: users[0].email,
            password: users[0].password
        }
        this.currentTest.loginObject = loginObject
        const addedUser = await userModel.addUser(users[0])

        
        this.currentTest.token = await authenticationModel.login(loginObject)
        // console.log(this.test.loginObject);
        // console.log(this.test.token);
    })
    it('Should add a user, integration', async function() {
        const users = await getTestUsers()
        request(app)
        .post('/api/register')
        .send(users[0])
        .end((err, res) => {
            expect(res).to.be.json
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('msg')
        })
    })
    it('Should login with a user, integration', async function() {
        console.log(this.test.loginObject);
        request(app)
        .post('/api/auth')
        .send(this.test.loginObject)
        .set('Authorization', `Bearer ${this.test.token}`)
        .end((err, res) => {
            console.log(res.body);
            expect(res).to.be.json
            expect(res).to.have.status(200)
        })
    })
     after(async function() {
        await userModel.clearAllUsers()
        await disconnect()
     })
     afterEach(async function() {
        await userModel.clearAllUsers()
     })

})