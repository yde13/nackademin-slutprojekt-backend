module.exports = {
    applyData: async () => {
        
        const {getDevelopmentProducts} = require('../database/getDevelopmentProducts')
        const {getTestUsers} = require('../test/testdata')

        const productsModel = require('../models/productsModel')
        const userModel = require('../models/userModel')
        
        let devProducts = await getDevelopmentProducts()
        let devUsers = await getTestUsers()
        for (let i = 0; i < devProducts.length; i++) {
            await productsModel.addProductsModel(devProducts[i])
        }
        await userModel.addUser(devUsers[2])
        
    }
}
