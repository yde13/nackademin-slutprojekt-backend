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
        // await userModel.clearAllUsers()
    })
    beforeEach(async function() {
        await userModel.clearAllUsers()
        const users = await getTestUsers()


        const loginObject = {
            email: users[1].email,
            password: users[1].password
        }
        this.currentTest.loginObject = loginObject
        const addedUser = await userModel.addUser(users[0])
        // const addedUser2 = await userModel.addUser(users[1])

        this.currentTest.token = await authenticationModel.login(loginObject)
        
    })
    it('Should add a user and login, integration', async function() {
        const users = await getTestUsers()
       
        const res = await request(app)
        .post('/api/register')
        .send(users[1])
        expect(res).to.be.json
        expect(res).to.have.status(201)
        expect(res.body).to.have.deep.property('token')
        expect(res.body).to.have.deep.property('user')
    })
    
    it('Should login with a user', async function() {
        console.log(this.test.token);
        const users = await getTestUsers()
        const loginPerson = {
            email: users[0].email,
            password: users[0].password
        }
        
        const res = await request(app)
        .post('/api/auth')
        .send(loginPerson)
        .set('Authorization', `Bearer ${this.test.token}`)
        console.log(res.body);
        expect(res).to.be.json
        expect(res).to.have.status(200)
     })

     after(async function() {
        await userModel.clearAllUsers()
        await disconnect()
     })
})