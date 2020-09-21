module.exports = {
    getTestUsers: async() => {
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
        ]
        return users
    }

}