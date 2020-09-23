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
            jonasfail = {
                namee: "jonas",
                passwordd: "123",
                role: "admin",
                email: "jonas@hotmail.com",
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
    }

}