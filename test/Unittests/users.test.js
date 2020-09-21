const chai = require('chai')
chai.should()
const {disconnect, connect} = require('../../database/database')
const userModel = require('../../models/userModel')
const { expect } = require('chai')
const {getTestUsers} = require('../testdata')
const authenticationModel = require('../../models/authenticationModel')

describe('Unit Tests for user(REGISTER)', () => {
    before(async function() {
        console.log('gör ansutningen till testdb');
        //await connect();
    })
    beforeEach(async function () {


        console.log('!!!!!!!!!!!!!!!!!')
        await userModel.clearAllUsers()
    })
    
    it('should add a user', async function () {
        console.log('?????????');
        //Arrange -> fetch mochdata
        const users = await getTestUsers()
        console.log('adding a user');
        //Act -> Add users to db
 
        const amandaResult = await userModel.addUser(users[0])

         //Assert
         amandaResult.should.be.deep.an('object')
         expect(users).to.be.deep.an('array')
         expect(amandaResult.name).to.be.equal(users[0].name)
         expect(amandaResult.email).to.be.equal(users[0].email)
    })
    it('should succeed to login', async function () {
        //Arrange -> fetch mochdata
        const users = await getTestUsers()
       
        //Act -> Add users to db then login
        const loginObject = {
            email : users[0].email,
            password: users[0].password
        }

        const amandaResult = await userModel.addUser(users[0])

        const loginResult = await authenticationModel.login(loginObject)

         //Assert
        amandaResult.should.be.deep.an('object')
        expect(users).to.be.deep.an('array')
        expect(amandaResult.name).to.be.equal(users[0].name)
        expect(amandaResult.email).to.be.equal(users[0].email)
        expect(loginResult).to.have.keys('token', 'user')
        expect(loginResult.user).to.have.keys('email', 'name', 'role', 'adress')
        expect(loginResult.user.adress.toJSON()).to.have.deep.keys('street', 'zip', 'city')

    })
    after(async function() {
        await disconnect()
    })
})



