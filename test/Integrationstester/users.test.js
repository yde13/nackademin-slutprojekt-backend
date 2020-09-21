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
        // await userModel.clearAllUsers()
        const users = await getTestUsers()
        const loginObject = {
            email: users[0].email,
            password: users[0].password
        }
        this.currentTest.loginObject = loginObject
        

        
        this.currentTest.token = await authenticationModel.login(loginObject)
    })
    it('Should add a user, integration', async function() {
        const users = await getTestUsers()
        const addedUser = await userModel.addUser(users[0])
        request(app)
        .post('/api/register')
        .send(users[0])
        .end((err, res) => {
            expect(res).to.be.json
            expect(res).to.have.status(201)
            // expect(res.body).to.have.property('token')
            // expect(res.body).to.have.property('user:')
        })
    })
    it('Should login with a user, integration', async function() {
        
        const users = await getTestUsers()
        const loginObject = {
            email: users[0].email,
            password: users[0].password
        }
        const addedUser = await userModel.addUser(users[0])
        console.log(loginObject);
        request(app)
        .post('/api/auth')
        .send(loginObject)
        .set('Authorization', `Bearer ${this.test.token}`)
        .end((err, res) => {
            console.log('login result bich');
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