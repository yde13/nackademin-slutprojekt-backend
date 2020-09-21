const userModel = require('../../models/userModel');
const productModel = require('../../models/productsModel');
const authenticationModel = require('../../models/authenticationModel');
const db = require('../../database/database');
const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request, should } = chai
const app = require('../../app.js')

describe('Integration test on tasks', () => {
    let currentTest = {}

    const user = {
        name: 'yde',
        password: 'root',
        role: "customer",
        email: 'yde@root.se',
        adress: {
            street: 'kallevägen 11',
            zip: '1337',
            city: 'blåkulla'
        }
    }

    const product = {
        title: 'Tröja',
        price: 100,
        shortDesc: 'Krage',
        longDesc: 'Fintröja med krage',
        imgFile: 'something.png',
    }
    before(async function () {
        await db.connect();
    });
    after(async function () {
        await db.disconnect();
    });
    before(async () => {
        await productModel.clear()

        let loginObj = {
            email: user.email,
            password: user.password
        }

        currentTest.user = await userModel.addUser(user)
        
        currentTest.product = await productModel.addProductsModel(product)
        
        currentTest.userID = currentTest.user._id
                
        currentTest.token = await authenticationModel.login(loginObj)            

    })

    it('Should get products integration test', () => {

        let data = currentTest.product;
        
        request(app)
            .get('/api/products')
            .set('Content-Type', `application/json`)
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
            })
    })

    it('Should add products integration test', () => {
        // Will add when auth middlewares are done
        let token = currentTest.token.token

    })

    it('Should edit products integration test', () => {
        // Will add when auth middlewares are done
        let token = currentTest.token.token



    })

    it('Should delete products integration test', () => {
        // Will add when auth middlewares are done
        let token = currentTest.token.token



    })

})