module.exports = {
    getDevelopmentProducts: async () => {
        const products = [
            testProduct1 = {
                title: 'Tröja',
                price: 100,
                shortDesc: 'Krage',
                longDesc: 'Fintröja med krage',
                imgFile: 'skateboard-greta.png',
            },
            testProduct2 = {
                title: 'Byxa',
                price: 150,
                shortDesc: 'Jeans',
                longDesc: 'Fin byxa som är blå',
                imgFile: 'skateboard-generic.png',
            }
        ]
        return products
    }
}