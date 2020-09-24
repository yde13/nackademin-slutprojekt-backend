const {User} = require('../database/database')

require('dotenv').config()
const bcrypt = require('bcryptjs')
async function hashPW (password) {
    return bcrypt.hashSync(password, 10)
}
module.exports = {
    addUser: async (user) => {
        try {
            const checkIfExists = await User.findOne({email: user.email})
            
            if(checkIfExists){
                return false
            } 
            else {
                user.password = await hashPW(user.password)
                return await User.create(user);
            }
        } catch (error) {
            return error
        }
    },
    addUserOrder: async (orderID, userID) => {
        try {
            return await User.updateOne({_id: userID}, { $push: { orderHistory: orderID } });
        } catch (error) {
            return error
        }
    },
    deleteUser: async (deleteId) => {
        try {
            return await User.deleteOne({_id: deleteId})
        } catch (error) {
            return error
        }
    },
    clearAllUsers: async () => {
        return await User.deleteMany({})
    },
    getUser: async(Userinfo) => {
        try {
            return await User.findOne(Userinfo)
        } catch (error) {
            return error
        }      
    }
}

