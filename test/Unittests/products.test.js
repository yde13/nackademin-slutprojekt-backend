const productsModel = require('../../models/productsModel')
const db = require('../../database/database');
const {getTestProducts} = require('../testdata')
require('chai').should()

describe('Product', function () {
    let product;
    before(async function () {
        await db.connect();
    });
    
    beforeEach(async function () {
        await productsModel.clear()

        product = await getTestProducts()
        await productsModel.addProductsModel(product[0])        
    })

    it('Should get all products', async function () {    

        const getProducts = await productsModel.getProductsModel()        
        
        getProducts[0].title.should.be.equal('Tröja')
        getProducts[0]._id.should.be.equal(getProducts[0]._id)
        getProducts[0].price.should.be.equal(100)
    })

    it('Should get a single product', async function () {

        const result = await productsModel.addProductsModel(product[0])        
        
        let id = result._id
        
        const getSingleProduct = await productsModel.getSingleProductModel(id)

        getSingleProduct[0].price.should.be.equal(100)
        getSingleProduct[0].title.should.be.equal('Tröja')
        getSingleProduct[0]._id.should.be.equal(getSingleProduct[0]._id)
    })

    it('Should add a product', async function () {

        const addProduct = await productsModel.addProductsModel(product[0])
        
        addProduct.price.should.be.equal(100)
        addProduct.title.should.be.equal('Tröja')
        addProduct._id.should.be.equal(addProduct._id)
    })

    it('Should edit a product', async function () {
        const addProduct = await productsModel.addProductsModel(product[0])

        let id = addProduct._id        

        const updateProduct = await productsModel.editProductsModel(id, product[1])
        updateProduct.ok.should.equal(1) 
    })

    it('Should delete a product', async function () {
        const addProduct = await productsModel.addProductsModel(product[0])

        let id = addProduct._id        

        const deleteProduct = await productsModel.deleteProductsModel(id)
        deleteProduct.ok.should.equal(1) 
    })

    after(async function () {
        await db.disconnect();
    });
})