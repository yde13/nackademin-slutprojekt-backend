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
            // const checkIfOrders = await User.find({orderHistory})
            // if(checkIfOrders.length < 0) user.orderHistory[0] 
            // console.log(checkIfExists);
            if(checkIfExists){
                console.log('FANNS REDAN');
                return false
            } 
            else {
                user.password = await hashPW(user.password)
                return await User.create(user);
            }
        } catch (error) {
            console.log(error)
            return error
        }
    },
    // updateUser: async (userToUpdate) => {
    //     try {
    //         if(userToUpdate.password) {
    //             userToUpdate.password = await hashPW(userToUpdate.password)
    //         }
    //         return await User.updateOne({_id: userToUpdate.userId},
    //             { $set: userToUpdate}, 
    //             {useFindAndModify: false, versionKey: false});
    //     } catch (error) {
    //         console.log(error);
    //         return error
    //     }
    // },
    // deleteUser: async (deleteId) => {
    //     try {
    //         return await User.deleteOne({_id: deleteId})
    //     } catch (error) {
    //         return error
    //     }
    // },
     clearAllUsers: async () => {
         return await User.deleteMany({})
     },
    // getUsers: async(text) => {
    //     // console.log(typeof(text))
    //     if(text == typeof(string)) {
    //         // console.log('fetch users for ' + text)
    //         try {
    //             return await User.find({username: new RegExp(text, 'i')})
    //         } catch (error) {
    //             return error
    //         }
    //     } else {
    //         try {
    //             return await User.find({})
    //         } catch (error) {
    //             return error
    //         }
    //     }

    // },
    getUser: async(Userinfo) => {
        try {
            return await User.findOne(Userinfo)
        } catch (error) {
            return error
        }      
    },
    // getUserTodos: async (userid) => {
    //     try {
    //         return await Todo.find({userid: userid})
    //     } catch (error) {
    //         return error
    //     }
    // }
}

