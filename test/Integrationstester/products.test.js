const userModel = require('../../models/userModel');
const productModel = require('../../models/productsModel');
const authenticationModel = require('../../models/authenticationModel');
const db = require('../../database/database');
const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request, should } = chai
const app = require('../../app.js')
const {getTestUsers, getTestProducts} = require('../testdata')

describe('Integration test on products', () => {
    let currentTest = {}

    before(async function () {
        await db.connect();
    });
    after(async function () {
        await db.disconnect();
    });
    before(async () => {
        await productModel.clear()

        const users = await getTestUsers()
        const products = await getTestProducts()

        let loginObj = {
            email: users[2].email,
            password: users[2].password
        }

        currentTest.user = await userModel.addUser(users[2])        

        currentTest.product = await productModel.addProductsModel(products[0])

        currentTest.userID = currentTest.user._id

        currentTest.token = await authenticationModel.login(loginObj)

    })

    it('Should get products integration test', async () => {

        let data = currentTest.product;

        const res = await request(app)
            .get('/api/products')
            .set('Content-Type', `application/json`)
            .send(data)

            expect(res).to.have.status(200)
            expect(res).to.be.json
    })

    it('Should add products integration test', async () => {
        let token = currentTest.token.token

        let data = currentTest.product;

        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)

            expect(res).to.have.status(200)
            expect(res).to.be.json

    })

    it('Should edit products integration test', async () => {
        let token = currentTest.token.token

        let id = currentTest.product._id

        let data = { title: 'Byxa' }

        const res = await request(app)
            .patch(`/api/products/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)

            expect(res).to.have.status(200)
            expect(res).to.be.json

    })

    it('Should delete products integration test', async () => {
        let token = currentTest.token.token;

        let id = currentTest.product._id

        let data = currentTest.product;
        const res = await request(app)
            .delete(`/api/products/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)

            expect(res).to.have.status(200)
            expect(res).to.be.json
    })

    it('Should fail delete product, integration test', async () => {
        let token = 'fakeToken';

        let id = currentTest.product._id

        let data = currentTest.product;
        const res = await request(app)
            .delete(`/api/products/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)

            expect(res).to.have.status(403)
            expect(res).to.be.json
    })

    it('Should fail edit product, integration test', async () => {
        let token = 'fakeToken';

        let id = currentTest.product._id

        let data = { title: 'Byxa' }

        const res = await request(app)
            .patch(`/api/products/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)

            expect(res).to.have.status(403)
            expect(res).to.be.json

    })

    it('Should fail add product, integration test', async () => {
        let token = 'fakeToken';

        let data = currentTest.product;

        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', `application/json`)
            .send(data)

            expect(res).to.have.status(403)
            expect(res).to.be.json

    })

})