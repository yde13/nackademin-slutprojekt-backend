const {User} = require('../database/database')

module.exports = {
    getUser: async (user) => {
        await User.create(user)
    }
}