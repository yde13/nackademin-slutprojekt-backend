module.exports = {
    getTestUsers: async () => {
        const users = [
            amanda = {
                name: "Amanda",
                password: "123",
                role: "customer",
                email: "Amanda@hotmail.com",
                adress: {
                    street: "Amandastreet",
                    zip: "12522",
                    city: "AmandaCity"
                }
            },
            jonas = {
                name: "jonas",
                password: "123",
                role: "customer",
                email: "jonas@hotmail.com",
                adress: {
                    street: "Jonasstreet",
                    zip: "12844",
                    city: "JonasCity"
                }
            },
            yde = {
                name: 'yde',
                password: 'root',
                role: "admin",
                email: 'yde@root.se',
                adress: {
                    street: 'kallevägen 11',
                    zip: '1337',
                    city: 'blåkulla'
                }
            }
        ]
        return users
    },

    getTestProducts: async () => {
        const products = [
            testProduct1 = {
                title: 'Tröja',
                price: 100,
                shortDesc: 'Krage',
                longDesc: 'Fintröja med krage',
                imgFile: 'something.png',
            }
        ]
        return products
    }

}