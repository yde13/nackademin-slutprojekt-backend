const productsModel = require('../../models/productsModel')
const db = require('../../database/database');
const {disconnect, connect} = require('../../database/database')
require('chai').should()

describe('Product', function () {
    before(async function () {
        await connect();
    });

    beforeEach(async function () {
        await productsModel.clear()
    })

    it('Should get all products', async function () {
        const product = {
            title: 'Tröja',
            price: 100,
            shortDesc: 'Krage',
            longDesc: 'Fintröja med krage',
            imgFile: 'something.png',
        }
        
        const result = await productsModel.addProductsModel(product)        

        const getProducts = await productsModel.getProductsModel()        
        
        getProducts[0].title.should.be.equal('Tröja')
        getProducts[0]._id.should.be.equal(getProducts[0]._id)
        getProducts[0].price.should.be.equal(100)
    })

    it('Should get a single product', async function () {
        const product = {
            title: 'Tröja',
            price: 100,
            shortDesc: 'Krage',
            longDesc: 'Fintröja med krage',
            imgFile: 'something.png',
        }
        const result = await productsModel.addProductsModel(product)        

        let id = result._id
        
        const getSingleProduct = await productsModel.getSingleProductModel(id)

        getSingleProduct[0].price.should.be.equal(100)
        getSingleProduct[0].title.should.be.equal('Tröja')
        getSingleProduct[0]._id.should.be.equal(getSingleProduct[0]._id)
    })

    it('Should add a product', async function () {
        const product = {
            title: 'Tröja',
            price: 100,
            shortDesc: 'Krage',
            longDesc: 'Fintröja med krage',
            imgFile: 'something.png',
        }
        const addProduct = await productsModel.addProductsModel(product)
        
        addProduct.price.should.be.equal(100)
        addProduct.title.should.be.equal('Tröja')
        addProduct._id.should.be.equal(addProduct._id)
    })

    it('Should edit a product', async function () {
        const product = {
            title: 'Tröja',
            price: 100,
            shortDesc: 'Krage',
            longDesc: 'Fintröja med krage',
            imgFile: 'something.png',
        }
        const addProduct = await productsModel.addProductsModel(product)

        let id = addProduct._id        

        let newProduct = {
            title: 'Byxa',
            price: 150,
            shortDesc: 'Jeans',
            longDesc: 'Fin byxa som är blå',
            imgFile: 'something.png',
        }
        const updateProduct = await productsModel.editProductsModel(id, newProduct)

        updateProduct.ok.should.equal(1) 
    })

    it('Should delete a product', async function () {
        const product = {
            title: 'Tröja',
            price: 100,
            shortDesc: 'Krage',
            longDesc: 'Fintröja med krage',
            imgFile: 'something.png',
        }
        const addProduct = await productsModel.addProductsModel(product)

        let id = addProduct._id        

        const deleteProduct = await productsModel.deleteProductsModel(id)
        //console.log(deleteProduct);
        deleteProduct.ok.should.equal(1) 
    })
    after(async function () {
        //await db.disconnect();
        await disconnect()
    });
})