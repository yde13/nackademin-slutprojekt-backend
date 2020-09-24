const chai = require('chai')
chai.should()
const { disconnect, connect } = require('../../database/database')
const userModel = require('../../models/userModel')
const { expect } = require('chai')
const { getTestUsers } = require('../testdata')
const authenticationModel = require('../../models/authenticationModel')

describe('Unit Tests for user(REGISTER)', () => {
    let users;

    before(async function () {
        await connect();
    })

    beforeEach(async function () {
        await userModel.clearAllUsers()
        users = await getTestUsers()

    })

    it('should add a user', async function () {

        const amandaResult = await userModel.addUser(users[0])

        amandaResult.should.be.deep.an('object')
        expect(users).to.be.deep.an('array')
        expect(amandaResult.name).to.be.equal(users[0].name)
        expect(amandaResult.email).to.be.equal(users[0].email)
    })
    
    it('should succeed to login', async function () {

        const loginObject = {
            email: users[0].email,
            password: users[0].password
        }

        const amandaResult = await userModel.addUser(users[0])

        const loginResult = await authenticationModel.login(loginObject)

        amandaResult.should.be.deep.an('object')
        expect(users).to.be.deep.an('array')
        expect(amandaResult.name).to.be.equal(users[0].name)
        expect(amandaResult.email).to.be.equal(users[0].email)
        expect(loginResult).to.have.keys('token', 'user')
        expect(loginResult.user).to.have.keys('email', 'name', 'role', 'adress')
        expect(loginResult.user.adress.toJSON()).to.have.deep.keys('street', 'zip', 'city')
    })

    after(async function () {
        disconnect()
    })
})



