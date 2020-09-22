const chai = require('chai')
chai.should()
const {disconnect, connect} = require('../../database/database')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const orderModel = require('../../models/orderModel')

describe('Integration test for orders', () => {    
    before(async () => {
        await db.connect()
    })

    it('Should ', () => {
        
    })

    after(async () => {
        await db.disconnect()
    })
})