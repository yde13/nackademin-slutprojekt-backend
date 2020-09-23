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
            jonasfail = {
                name: "jonas5",
                password: "123",
                role: "admin",
                email: "jonas5@hotmail.com",
                adress: {
                    street: "Jonasstreet",
                    zip: "12844",
                    city: "JonasCity"
                }
            },
            jonasexisting1 = {
                name: "jonas",
                password: "123",
                role: "admin",
                email: "jonas1@hotmail.com",
                adress: {
                    street: "Jonasstreet",
                    zip: "12844",
                    city: "JonasCity"
                }
            },            
            jonasexisting2 = {
                name: "jonas",
                password: "123",
                role: "admin",
                email: "jonas1@hotmail.com",
                adress: {
                    street: "Jonasstreet",
                    zip: "12844",
                    city: "JonasCity"
                }
            },
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
    },

    getTestOrders: async () => {
        const order = [
            testOrder = {
                timeStamp: Date.now(),
                status: 'inProcess',
                items: ["5f687048d6e69237c5d3c75b", "5f687081d6e69237c5d3c75c"],
                orderValue: 1498,
            }
        ]
        return order
    }

}